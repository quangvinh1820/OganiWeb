const moment = require('moment');

class VnPayController{
    // Tạo thanh toán khi click vào nút thanh toán
    async create(req, res, next) {
        process.env.TZ = 'Asia/Ho_Chi_Minh';
    
        let date = new Date();
        let createDate = moment(date).format('YYYYMMDDHHmmss');
        
        let ipAddr = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;

        let config = require('config');
        
        let tmnCode = config.get('AZ8JFLX2');
        let secretKey = config.get('VWPPMJVGMNOFPXSHAQNIBPVMBQZLXUKI');
        let vnpUrl = config.get('https://sandbox.vnpayment.vn/paymentv2/vpcpay.html');
        let returnUrl = config.get('http://localhost:3000/success');
        let orderId = moment(date).format('DDHHmmss');
        let amount = req.body.amount;
        let bankCode = req.body.bankCode;
        
        let locale = req.body.language;
        if(locale === null || locale === ''){
            locale = 'vn';
        }
        let currCode = 'VND';
        let vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        vnp_Params['vnp_Locale'] = locale;
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
        vnp_Params['vnp_OrderType'] = 'other';
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_IpAddr'] = ipAddr;
        vnp_Params['vnp_CreateDate'] = createDate;
        if(bankCode !== null && bankCode !== ''){
            vnp_Params['vnp_BankCode'] = bankCode;
        }

        vnp_Params = sortObject(vnp_Params);

        let querystring = require('qs');
        let signData = querystring.stringify(vnp_Params, { encode: false });
        let crypto = require("crypto");     
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex"); 
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

        res.redirect(vnpUrl)
      };
    
    // Trả về UI Client thông báo
    async return(req, res, next){
        let vnp_Params = req.query;

        let secureHash = vnp_Params['vnp_SecureHash'];

        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];

        vnp_Params = sortObject(vnp_Params);

        let config = require('config');
        let tmnCode = config.get('vnp_TmnCode');
        let secretKey = config.get('vnp_HashSecret');

        let querystring = require('qs');
        let signData = querystring.stringify(vnp_Params, { encode: false });
        let crypto = require("crypto");     
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");     

        if(secureHash === signed){
            //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

            res.render('success', {code: vnp_Params['vnp_ResponseCode']})
        } else{
            res.render('success', {code: '97'})
        }
    };

    //VnPay gửi về IPN mã để xử lý
    async ipn(req, res, next){
        let vnp_Params = req.query;
        let secureHash = vnp_Params['vnp_SecureHash'];
        
        let orderId = vnp_Params['vnp_TxnRef'];
        let rspCode = vnp_Params['vnp_ResponseCode'];

        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];

        vnp_Params = sortObject(vnp_Params);
        let config = require('config');
        let secretKey = config.get('vnp_HashSecret');
        let querystring = require('qs');
        let signData = querystring.stringify(vnp_Params, { encode: false });
        let crypto = require("crypto");     
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");     
        
        let paymentStatus = '0'; 
        
        let checkOrderId = true; 
        let checkAmount = true; 
        if(secureHash === signed){
            if(checkOrderId){
                if(checkAmount){
                    if(paymentStatus=="0"){ 
                        if(rspCode=="00"){
                            res.status(200).json({RspCode: '00', Message: 'Success'})
                        }
                        else {
                            res.status(200).json({RspCode: '00', Message: 'Success'})
                        }
                    }
                    else{
                        res.status(200).json({RspCode: '02', Message: 'This order has been updated to the payment status'})
                    }
                }
                else{
                    res.status(200).json({RspCode: '04', Message: 'Amount invalid'})
                }
            }       
            else {
                res.status(200).json({RspCode: '01', Message: 'Order not found'})
            }
        }
        else {
            res.status(200).json({RspCode: '97', Message: 'Checksum failed'})
        }
    };
}

module.exports = new VnPayController;