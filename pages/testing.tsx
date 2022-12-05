import React, { useEffect } from "react";

type Props = {};

const data = {
  order: {
    cart: [[Object]],
    total: 123,
    numberOfItems: 1,
    _persist: { version: -1, rehydrated: true },
  },
  customer: {
    firstName: "Andrew",
    lastName: "Gary",
    address1: "419 Elm Street",
    address2: "",
    city: "Yorkville",
    state: "AZ",
    zip: "59599",
    phoneNumber: "6309911022",
    specialInstructions: "",
    email: "andrew.gary91@gmail.com",
    emailConfirmation: "andrew.gary91@gmail.com",
  },
  paid: false,
  shipped: false,
  paymentMethod: "venmo",
};

const Testing = (props: Props) => {
  
  const handleSubmit = async (e) => {

    /**
     * Set the verb to POST.
Enter https://api-m.sandbox.paypal.com/v1/oauth2/token as the request URL.
Select the Authorization tab.
From the TYPE list, select Basic Auth.
In the Username field, enter your client ID.
In the Password field, enter your secret.
Select the Body tab.
Select the x-www-form-urlencoded option.
In the KEY field, enter grant_type.
In the VALUE field, enter client_credentials.
Select Send.
     */

interface RequestOptions {

}

var myHeaders = new Headers();
myHeaders.append("Authorization", "Basic QVhqWm1xRmZfWkZ6NGVtMFF1dGxkYldfcDZrb19zMmd0X3BlR1pDaEJEcmJiaVJ1SFpRbkN0UlVmS3hfVmF6Q282aXBiSnJ4cEdQTEt1TGM6RUlIRHVaQ3J2Z1J2TS1PRjJFN3dmWEVTVmZMeW1XVEVMZWRHYU9QU2N0NkRsc2tfb1FKTGhMR0k3TkNsb2N1aU9WdFlWVGJSUkpyMGRpSnI=");
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("grant_type", "client_credentials");

var requestOptions: any = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

const yeah = await fetch("https://api-m.sandbox.paypal.com/v1/oauth2/token", requestOptions);

const resp = await yeah.json();

const accessToken = resp.access_token;

// fetch("https://api-m.sandbox.paypal.com/v1/oauth2/token", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));

    // const tokenReqOptions: any = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    //     // 'Authorization': `Basic ${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
    //     'Authorization': 'Basic AXjZmqFf_ZFz4em0QutldbW_p6ko_s2gt_peGZChBDrbbiRuHZQnCtRUfKx_VazCo6ipbJrxpGPLKuLc:EIHDuZCrvgRvM-OF2E7wfXESVfLymWTELedGaOPSct6Dlsk_oQJLhLGI7NClocuiOVtYVTbRRJr0diJr'

    //   },
    //   body: {
    //     grant_type: 'client_credentials'
    //   }
      
    // }

    // const resp = await fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', tokenReqOptions)

    // const yeah = await resp.json();

    // console.log('yeah: ', yeah);    
    const reqOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        detail: {
          invoice_number: "123",
          reference: "deal-ref",
          invoice_date: "2022-12-04",
          currency_code: "USD",
          note: "Thank you for your business.",
          term: "No refunds after 30 days.",
          memo: "This is a long contract",
          payment_term: {
            term_type: "DUE_ON_DATE_SPECIFIED",
            due_date: "2022-12-06",
          },
        },
        invoicer: {
          name: {
            given_name: "David",
            surname: "Larusso",
          },
          address: {
            address_line_1: "1234 First Street",
            address_line_2: "337673 Hillside Court",
            admin_area_2: "Anytown",
            admin_area_1: "CA",
            postal_code: "98765",
            country_code: "US",
          },
          email_address: "adamgaryglass@gmail.com",
          phones: [
            {
              country_code: "001",
              national_number: "4085551234",
              phone_type: "MOBILE",
            },
          ],
          website: "https://example.com",
          tax_id: "XX-XXXXXXX",
          logo_url: "https://example.com/logo.PNG",
          additional_notes: "example note",
        },
        primary_recipients: [
          {
            billing_info: {
              name: {
                given_name: "Stephanie",
                surname: "Meyers",
              },
              address: {
                address_line_1: "1234 Main Street",
                admin_area_2: "Anytown",
                admin_area_1: "CA",
                postal_code: "98765",
                country_code: "US",
              },
              email_address: "<bill-me@example.com>",
              phones: [
                {
                  country_code: "001",
                  national_number: "4884551234",
                  phone_type: "HOME",
                },
              ],
              additional_info_value: "add-info",
            },
            shipping_info: {
              name: {
                given_name: "Stephanie",
                surname: "Meyers",
              },
              address: {
                address_line_1: "1234 Main Street",
                admin_area_2: "Anytown",
                admin_area_1: "CA",
                postal_code: "98765",
                country_code: "US",
              },
            },
          },
        ],
        items: [
          {
            name: "Yoga Mat",
            description: "Elastic mat to practice yoga.",
            quantity: "1",
            unit_amount: {
              currency_code: "USD",
              value: "50.00",
            },
            tax: {
              name: "Sales Tax",
              percent: "7.25",
            },
            discount: {
              percent: "5",
            },
            unit_of_measure: "QUANTITY",
          },
          {
            name: "Yoga t-shirt",
            quantity: "1",
            unit_amount: {
              currency_code: "USD",
              value: "10.00",
            },
            tax: {
              name: "Sales Tax",
              percent: "7.25",
            },
            discount: {
              amount: {
                currency_code: "USD",
                value: "5.00",
              },
            },
            unit_of_measure: "QUANTITY",
          },
        ],
        configuration: {
          partial_payment: {
            allow_partial_payment: true,
            minimum_amount_due: {
              currency_code: "USD",
              value: "20.00",
            },
          },
          allow_tip: true,
          tax_calculated_after_discount: true,
          tax_inclusive: false,
          template_id: "",
        },
        amount: {
          breakdown: {
            custom: {
              label: "Packing Charges",
              amount: {
                currency_code: "USD",
                value: "10.00",
              },
            },
            shipping: {
              amount: {
                currency_code: "USD",
                value: "10.00",
              },
              tax: {
                name: "Sales Tax",
                percent: "7.25",
              },
            },
            discount: {
              invoice_discount: {
                percent: "5",
              },
            },
          },
        },
      }),
    };

    const yeahh = await fetch('https://api-m.sandbox.paypal.com/v2/invoicing/invoices', reqOptions);

    const jeah = await yeahh.json();
    console.log('jeah: ', jeah);
  }

  return (
    // <div style='display: flex; flex-direction: column'><span>Thanks for your order {data.customer.firstName}</span><h1>Shipping Address</h1><span>{data.customer.firstName} {data.customer.lastName}</span><span>{data.customer.address1}</span><span>{data.customer.city}, {data.customer.state} {data.customer.zip}</span></div>

    // <div className='flex flex-col'><span>Thanks for your order {data.customer.firstName}</span><h1>Shipping Address</h1><span>{data.customer.firstName} {data.customer.lastName}</span><span>{data.customer.address1}</span><span>{data.customer.city}, {data.customer.state} {data.customer.zip}</span></div>

    <div className="flex flex-col">
      <button onClick={handleSubmit} className="border border-black px-3">Test</button>
    </div>
  );
};

export default Testing;
