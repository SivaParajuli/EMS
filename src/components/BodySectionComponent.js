import React from 'react';
import { Box, Typography } from '@mui/material';

const bodySectionStyles = {
  height: '400px',
  overflowY: 'scroll',
  padding: '16px',
  background: '#f5f5f5',
  '&::-webkit-scrollbar': {
    width: '0px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#e0e0e0',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#888',
    borderRadius: '4px',
  },
};

const blogItemStyles = {
  marginBottom: '16px',
  padding: '16px',
  background: '#fff',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
};

const BodySectionComponent = () => {
  const blogItems = [
    { title: 'Payment Ease with E-Wallets', 
    content: `<h4>In today's digital era, traditional payment methods are gradually being replaced by more convenient and secure alternatives. One such solution is the rise of electronic wallets, commonly known as e-wallets.</h4>
      
    <p style={{fontSize:'12px'}}>E-wallets have revolutionized the way we make payments, providing a seamless and hassle-free experience. In this blog, we will explore the payment ease that e-wallets offer and how they have transformed the way we handle transactions.</p>
    
    <h4>What are E-Wallets?</h4>
    
    <p style={{fontSize:'12px'}}>E-wallets are digital wallets that allow users to store, manage, and transact money electronically. They are typically accessed through mobile applications, offering a convenient way to make payments on-the-go. E-wallets securely store payment information, such as credit or debit card details, eliminating the need to carry physical cards or cash.</p>
    
    <h4>Seamless Transactions:</h4>
    
    <p style={{fontSize:'12px'}}>One of the key advantages of using e-wallets is the ease of making transactions. With a few taps on your smartphone, you can complete payments for purchases, bills, and services. E-wallets streamline the checkout process, eliminating the need for tedious manual input of payment details for every transaction. This not only saves time but also reduces the chances of errors during payment.</p>
    
    <h4>Wide Acceptance:</h4>
    
    <p style={{fontSize:'12px'}}>E-wallets have gained widespread acceptance, making them a versatile payment option. They are now accepted at various establishments, including retail stores, restaurants, online marketplaces, and even public transportation systems. With e-wallets, you can make payments with a simple scan of a QR code or a tap on the payment terminal, offering a convenient and contactless payment experience.</p>
    
    <h4>Security and Privacy:</h4>
    
    <p style={{fontSize:'12px'}}>Security is a top concern when it comes to financial transactions. E-wallets prioritize the safety of your payment information. They employ advanced encryption techniques to protect your data from unauthorized access. Additionally, e-wallets offer additional security features such as biometric authentication (fingerprint or facial recognition) and transaction notifications, providing peace of mind and safeguarding against fraudulent activities.</p>
    
    <h4>Rewards and Discounts:</h4>
    
    <p style={{fontSize:'12px'}}>Many e-wallets provide loyalty programs and cashback rewards, incentivizing users to adopt this payment method. These rewards can range from discounts at partner merchants to exclusive deals and promotions. By using e-wallets for your transactions, you can enjoy savings and benefits, enhancing your overall payment experience.</p>
    
    <h4>Budget Management:</h4>
    
    <p style={{fontSize:'12px'}}>E-wallets often come equipped with features that enable users to track their expenses and manage their budgets effectively. They provide detailed transaction histories, spending analysis, and budgeting tools, helping users gain better control over their finances. This makes it easier to track expenses, set savings goals, and make informed financial decisions.</p>
    
    <p style={{fontSize:'12px'}}>E-wallets have revolutionized the way we handle payments, offering unparalleled convenience, security, and versatility. With their seamless transactions, wide acceptance, and enhanced security measures, e-wallets have become an integral part of our daily lives. Whether it's paying for groceries, dining out, or splitting bills with friends, e-wallets provide a fast, secure, and rewarding payment experience. Embrace the payment ease with e-wallet!</p>` 
    },
    
    { title: 'Get Venue by location', content: `
    <h4>Get Venue By Location</h4>
      
      <p>Are you looking for the perfect venue to host your event? Finding the right venue in the right location can be a crucial factor in the success of your event. Fortunately, with the advancements in technology, it has become easier than ever to get venue recommendations based on your desired location.</p>
      
      <h4>Methods to Get Venue By Location:</h4>
      
      <ul>
        <li style={{fontSize:'10px'}}>Online Venue Directories: There are several online venue directories available that allow you to search for venues based on location.</li>
        <li style={{fontSize:'10px'}}>Social Media: Social media platforms like Facebook, Instagram, and LinkedIn can also be valuable resources for finding venues.</li>
        <li style={{fontSize:'10px'}}>Event Planning Apps: Event planning apps have become increasingly popular and offer features to help you find venues based on your location.</li>
        <li style={{fontSize:'10px'}}>Local Event Planners and Agencies: Local event planners and agencies are experts in their area and have extensive knowledge of venues available for events.</li>
        <li style={{fontSize:'10px'}}>Online Reviews and Recommendations: Utilize online review platforms like Yelp, Google Reviews, and TripAdvisor to gain insights into different venues.</li>
      </ul>
      
      <p>Remember to consider factors such as capacity, amenities, accessibility, parking facilities, and cost when selecting a venue. It's essential to visit the venue in person or take a virtual tour if available to ensure it meets your expectations.</p>
      
      <p>In conclusion, finding the perfect venue by location has become more convenient and accessible with the help of online platforms, social media, event planning apps, local experts, and online reviews. By leveraging these resources, you can discover a variety of venues and make an informed decision for your next event. Take the time to research and explore your options, and you'll soon find the ideal venue that matches your location and event requirements. Happy venue hunting!</p>
    `}
    
    // Add more blog items
  ];

  return (
    <Box sx={bodySectionStyles}>
      <Typography variant="h6" sx={{  fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
      textAlign:'center'}} gutterBottom>
        Event Management System
      </Typography>
      {blogItems.map((item, index) => (
        <Box
          key={index}
          sx={{
            ...blogItemStyles,
            opacity: 1, // Initial opacity value
            '&:hover': {
                boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)'
            }
          }}
        >
          <Typography variant="h6" sx={{  fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
          fontWeight:'500'}}>{item.title}</Typography>
          <Typography variant="body1" sx={{fontSize:'13px',
            fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
            fontWeight:'500'}}
           dangerouslySetInnerHTML={{ __html: item.content}}></Typography>
        </Box>
      ))}
    </Box>
  );
};

export default BodySectionComponent;
