import { rest } from "msw";

export const handlers = [
  rest.get(
    "https://api.chec.io/v1/services/locale/chkt_QG375vgMmQlrMO/countries",
    (req, res, ctx) => {
      return res(
        ctx.json({
          countries: {
            AN: "Andorra",
            AU: "Austria",
            BG: "Bulgaria",
            USA: "United States",
          },
        })
      );
    }
  ),
  rest.get(
    "https://api.chec.io/v1/services/locale/chkt_QG375vgMmQlrMO/countries/AN/subdivisions",
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
    "https://api.chec.io/v1/services/locale/chkt_QG375vgMmQlrMO/countries/AU/subdivisions",
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
    "https://api.chec.io/v1/checkouts/chkt_QG375vgMmQlrMO/helper/shipping_options",
    (req, res, ctx) => {
      const query = req.url.searchParams;
      const country = query.get("country");
      if (country === "USA") {
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
];
