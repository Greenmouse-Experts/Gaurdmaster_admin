import { TabList, Tabs, Tab, TabPanel, TabPanels } from '@chakra-ui/react'
import React from 'react'
import PaymentList from '../components/payment/paymentList'

const Payments = () => {
  const tabData = [
    {
      label: 'Completed Payments',
      content: <PaymentList status={'confirmed'}/>,
    },
    {
      label: 'Pending Payments',
      content:
        <PaymentList status={'pending'}/>,
    },
    {
      label: 'Cancelled Payments',
      content:
        <PaymentList status={'pending'}/>,
    },
  ]
  return (
    <div className='mt-6'>
       <Tabs>
        <TabList>
          {tabData.map((tab, index) => (
            <Tab key={index} className='fw-600'>{tab.label}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {tabData.map((tab, index) => (
            <TabPanel p={4} key={index}>
              {tab.content}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </div>
  )
}

export default Payments