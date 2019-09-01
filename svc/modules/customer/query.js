module.exports = {
  customerList: () => (
    ` 
    SELECT
      CUSTOMER_ID,
      CUSTOMER_NAME     
    FROM 
      CUSTOMER
    ORDER BY CUSTOMER_NAME
    `
  ),
  getCustomerContactsById: (id) => (
    `
    SELECT
      CUSTOMER_CONTACTS.CONTACT_ID,
      CONTACT.NAME CONTACT_NAME
    FROM 
      CUSTOMER_CONTACTS
    INNER JOIN CUSTOMER
      ON CUSTOMER_CONTACTS.CUSTOMER_ID=CUSTOMER.CUSTOMER_ID
    INNER JOIN CONTACT
      ON CUSTOMER_CONTACTS.CONTACT_ID=CONTACT.CONTACT_ID 
    WHERE
      CUSTOMER.CUSTOMER_ID = ${id}
    ORDER BY CONTACT_NAME
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
  insertContact: (contact) => (
    `
      INSERT INTO CONTACT (
        NAME,
        EMAIL,
        PHONE
      ) VALUES (
        '${contact.NAME}',
        '${contact.EMAIL}',
        '${contact.PHONE}'
      )
    `
  )
}