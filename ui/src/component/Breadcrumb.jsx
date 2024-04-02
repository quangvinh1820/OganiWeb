import breadcrumb from "../img/breadcrumb.jpg";

const Breadcrumb = ({title, categories}) => {
    return (
        <section className="breadcrumb-section set-bg" style={{backgroundImage: `url(${breadcrumb})`}}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <div className="breadcrumb__text">
                            <h2>{title}</h2>
                            <div className="breadcrumb__option">
                                <a href="/">Home</a>
                                <a href="/vegetables">{categories}</a>
                                <span>{title}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Breadcrumb;