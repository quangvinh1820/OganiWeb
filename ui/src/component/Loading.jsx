import React from 'react'
import { Spin } from 'antd'

export default function Loading({ children, isLoading, deday = 200 }) {
  return (
    <Spin spinning={isLoading} delay={deday}>
            {children}
    </Spin>
  )
}
