module.exports = {
  customerList: (Condition) => (
    ` 
    SELECT
      CUSTOMER_ID,
      CUSTOMER_NAME,
      CUSTOMER_ADDRESS,
      CUSTOMER_CITY,
      CUSTOMER_STATE,
      CUSTOMER_ZIP      
    FROM 
      CUSTOMER          
    ${Condition} 
    `   
  ),

  insertCustomer: (customer) => (
    `
    INSERT INTO CUSTOMER (
      CUSTOMER_NAME,
      CUSTOMER_ADDRESS,
      CUSTOMER_CITY,
      CUSTOMER_STATE,
      CUSTOMER_ZIP
    ) VALUES (
      '${customer.CUSTOMER_NAME}',
      '${customer.CUSTOMER_ADDRESS}',
      '${customer.CUSTOMER_CITY}',
      '${customer.CUSTOMER_STATE}',
      '${customer.CUSTOMER_ZIP}'
    )
    `
  ),

  getCustomerInfo: (id) => (
    `
    SELECT
      *
    FROM 
      CUSTOMER 
    WHERE
    CUSTOMER.CUSTOMER_ID = ${id}
    `
  ),

  updateCustomer: (id, customer) => (
    `
    UPDATE CUSTOMER SET 
      CUSTOMER_NAME = '${customer.CUSTOMER_NAME}',
      CUSTOMER_ADDRESS = '${customer.CUSTOMER_ADDRESS}',
      CUSTOMER_CITY = '${customer.CUSTOMER_CITY}',
      CUSTOMER_STATE = '${customer.CUSTOMER_STATE}',
      CUSTOMER_ZIP = '${customer.CUSTOMER_ZIP}'     
    WHERE
    CUSTOMER.CUSTOMER_ID = ${id}
    `
  ),
  
  insertCustomerContact: (customerContact) => (
    `
    INSERT INTO CUSTOMER_CONTACTS (
      CUSTOMER_ID,
      CONTACT_ID
    ) VALUES (
      ${customerContact.CUSTOMER_ID},
      ${customerContact.CONTACT_ID}
    )
    `
  ),

  getCustomerContactsById: (id) => (
    `
    SELECT
      CUSTOMER_CONTACTS.CUSTOMER_ID,
      CUSTOMER_CONTACTS.CONTACT_ID,
      CUSTOMER.CUSTOMER_NAME,
      CONTACT.NAME CONTACT_NAME
    FROM 
      CUSTOMER_CONTACTS
    INNER JOIN CUSTOMER
      ON CUSTOMER_CONTACTS.CUSTOMER_ID=CUSTOMER.CUSTOMER_ID
    INNER JOIN CONTACT
      ON CUSTOMER_CONTACTS.CONTACT_ID=CONTACT.CONTACT_ID 
    WHERE
      CUSTOMER.CUSTOMER_ID = ${id}
    `
  )
}