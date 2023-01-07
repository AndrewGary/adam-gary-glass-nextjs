export const usStates = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

export const getAuthToken = async () => {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Basic QVJKX0NhX043ZTZaTzFSbWc2eTlLd2FIYkx6Yll6QkZheEVVRXpqeE5rQUc4eWt4cEZVQW52ZkRyMklLeDFmODVNOXgyM29IZkxLdVduQ2s6RUlsS0N3eHg5eXpoX2pYSEo1dUVEYzBCakFKeXpobC1BdFJOM2k1OE9hTFdsbTdGdFY4cGxXM1hoRWlxOUlzbmJjWTBNbTFhbWRqUm94ZVg="
  );
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  var requestOptions: any = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  const token = await fetch(
    "https://api-m.sandbox.paypal.com/v1/oauth2/token",
    requestOptions
  );

  const resp = await token.json();

  return resp.access_token;
};

export const getNextInvoiceNumber = async (token: string) => {
  const nextInvoiceNumberResp = await fetch(
    "https://api-m.sandbox.paypal.com/v2/invoicing/generate-next-invoice-number",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const resp = await nextInvoiceNumberResp.json();

  return resp.invoice_number;
};

export const createDraftInvoice = async (
  token: string,
  data: any,
  invoiceNumber: any
) => {
  const { customer, order } = data;

  const reqOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      detail: {
        invoice_number: invoiceNumber,
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
          given_name: "Adam",
          surname: "Gary",
        },
        address: {
          address_line_1: "3005 Adams Address",
          address_line_2: "",
          admin_area_2: "Grand Junction",
          admin_area_1: "CO",
          postal_code: "11111",
          country_code: "US",
        },
        email_address: "sb-hup2b21566779@business.example.com",
        phones: [
          {
            country_code: "001",
            national_number: "8155088556",
            phone_type: "MOBILE",
          },
        ],
        website: "",
        tax_id: "",
        logo_url: "",
        additional_notes: "e",
      },
      primary_recipients: [
        {
          billing_info: {
            name: {
              given_name: customer.firstName,
              surname: customer.lastName,
            },
            address: {
              address_line_1: customer.address1,
              admin_area_2: customer.city,
              admin_area_1: customer.state,
              postal_code: customer.zip,
              country_code: "US",
            },
            email_address: customer.email,
            phones: [
              {
                country_code: "001",
                national_number: customer.phoneNumber,
                phone_type: "HOME",
              },
            ],
            additional_info_value: "",
          },
          shipping_info: {
            name: {
              given_name: customer.firstName,
              surname: customer.lastName,
            },
            address: {
              address_line_1: customer.address1,
              admin_area_2: customer.city,
              admin_area_1: customer.state,
              postal_code: customer.zip,
              country_code: "US",
            },
          },
        },
      ],
      items: order.cart.map((item: any) => {
        return {
          name: item.name,
          description: item.description,
          quantity: item.quantity.toString(),
          unit_amount: {
            currency_code: "USD",
            value: item.price.toString(),
          },
          unit_of_measure: "QUANTITY",
        };
      }),
      configuration: {
        allow_tip: false,
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
          },
        },
      },
    }),
  };

  const yeahh = await fetch(
    "https://api-m.sandbox.paypal.com/v2/invoicing/invoices",
    reqOptions
  );

  const resp = await yeahh.json();

  return resp;
};

export const sendInvoice = async (token: string, data: any) => {
  const eee = await fetch(data.href, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const eeee = await eee.json();

  const sendInvoice = await fetch(
    `https://api-m.sandbox.paypal.com/v2/invoicing/invoices/${eeee.id}/send`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const sendInvoiceJson = await sendInvoice.json();

  return sendInvoiceJson;
};
