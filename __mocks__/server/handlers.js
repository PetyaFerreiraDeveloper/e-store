import { rest } from "msw";

export const handlers = [
  rest.get(
    "https://api.chec.io/v1/services/locale/chkt_QG375vgMmQlrMO/countries",
    (req, res, ctx) => {
      return res(
        ctx.json({
          countries: {
            AD: "Andorra",
            AT: "Austria",
            BG: "Bulgaria",
            US: "United States",
          },
        })
      );
    }
  ),
  rest.get(
    "https://api.chec.io/v1/services/locale/chkt_QG375vgMmQlrMO/countries/AD/subdivisions",
    (req, res, ctx) => {
      return res(
        ctx.json({
          subdivisions: {
            "07": "Andorra la Vella",
            "02": "Canillo",
          },
        })
      );
    }
  ),
  rest.get(
    "https://api.chec.io/v1/services/locale/chkt_QG375vgMmQlrMO/countries/AT/subdivisions",
    (req, res, ctx) => {
      return res(
        ctx.json({
          subdivisions: {
            1: "Burgenland",
            2: "Kärnte",
          },
        })
      );
    }
  ),
  rest.get(
    "https://api.chec.io/v1/services/locale/chkt_QG375vgMmQlrMO/countries/US/subdivisions",
    (req, res, ctx) => {
      return res(
        ctx.json({
          subdivisions: {
            AL: "Alabama",
            AK: "Alaska",
          },
        })
      );
    }
  ),
  rest.get(
    "https://api.chec.io/v1/checkouts/chkt_QG375vgMmQlrMO/helper/shipping_options",
    (req, res, ctx) => {
      const query = req.url.searchParams;
      const country = query.get("country");
      if (country === "US") {
        return res(
          ctx.json([
            {
              id: "ship_DWy4oGWypo6Jx2",
              description: "Domestic",
              price: {
                raw: 0,
                formatted: "0.00",
                formatted_with_symbol: "kr0.00",
                formatted_with_code: "0.00 DKK",
              },
              countries: ["US"],
            },
          ])
        );
      }
      return res(
        ctx.json([
          {
            id: "ship_bWZ3l8WLO5kpEQ",
            description: "EU",
            price: {
              raw: 100,
              formatted: "100.00",
              formatted_with_symbol: "kr100.00",
              formatted_with_code: "100.00 DKK",
            },
            countries: ["AD", "AT", "BG"],
          },
        ])
      );
    }
  ),
  rest.post(
    "https://api.chec.io/v1/checkouts/chkt_RqEv5xgnz7oZz4",
    (req, res, ctx) => {
      const cardNumber = req.body.payment.card.number;
      if(cardNumber !== '4242424242424242') {
        return res(
          ctx.status(403),
          ctx.json({
            error: {
              message: 'Wrong number'
            }
          })

        )
      }
      return res(
        ctx.status(201),
        ctx.json({
          customer_reference: "BHKB_1234",
          customer: {
            firstname: "John",
            lastname: "Doe",
          },
          order_value: {
            formatted_with_symbol: "kr384.00",
          },
        })
      );
    }
  ),
];
