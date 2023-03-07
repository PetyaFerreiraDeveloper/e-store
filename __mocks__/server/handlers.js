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
    "https://api.chec.io/v1/checkouts/chkt_QG375vgMmQlrMO/helper/shipping_options",
    (req, res, ctx) => {
      return res(
        ctx.json([
          {
            code: "ship_bWZ3l8WLO5kpEQ",
            name: "EU-kr100.00",
          },
        ])
      );
    }
  ),
];
