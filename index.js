const express = require('express');
const https = require('https');
const app = express();
const tokens = [
  { symbol: "atlas_usdt", contract: "ATLAS" },
  { symbol: "samo_usdt", contract: "SAMO" },
  { symbol: "srm_usdt", contract: "SRM" },
  { symbol: "gari_usdt", contract: "GARI" },
  { symbol: "polis_usdt", contract: "POLIS" },
  { symbol: "kin_usdt", contract: "KIN" },
  { symbol: "fida_usdt", contract: "FIDA" },
  { symbol: "gmt_usdt", contract: "GMT" },
  { symbol: "mbs_usdt", contract: "MBS" },
  { symbol: "zbc_usdt", contract: "ZBC" },
  { symbol: "elu_usdt", contract: "ELU" },
  { symbol: "likeusdt", contract: "LIKE" },
  { symbol: "mnde_usdt", contract: "MNDE" },
  { symbol: "slim_usdt", contract: "SLIM" },
  { symbol: "gst_usdt", contract: "GST" },
  { symbol: "ray_usdt", contract: "RAY" },
  { symbol: "orca_usdt", contract: "ORCA" },
  { symbol: "hades_usdt", contract: "HADES" },
  { symbol: "sunny_usdt", contract: "SUNNY" },
  { symbol: "cwar_usdt", contract: "CWAR" },
  { symbol: "prt_usdt", contract: "PRT" },
  { symbol: "mean_usdt", contract: "MEAN" },
  { symbol: "mngo_usdt", contract: "MNGO" },
  { symbol: "maps_usdt", contract: "MAPS" },
  { symbol: "sbr_usdt", contract: "SBR" },
  { symbol: "like_usdt", contract: "LIKE" },
  { symbol: "crp_usdt", contract: "CRP" },
  { symbol: "stp_usdt", contract: "STP" },
  { symbol: "slrs_usdt", contract: "SLRS" },
  { symbol: "port_usdt", contract: "PORT" },
  { symbol: "sntr_usdt", contract: "SNTR" },
  { symbol: "nos_usdt", contract: "NOS" },
  { symbol: "ttt_usdt", contract: "TTT" },
  { symbol: "dio_usdt", contract: "DIO" },
  { symbol: "mer_usdt", contract: "MER" },
  { symbol: "psy_usdt", contract: "PSY" },
  { symbol: "liq_usdt", contract: "LIQ" },
  { symbol: "slc_usdt", contract: "SLC" },
  { symbol: "sao_usdt", contract: "SAO" },
  { symbol: "solr_usdt", contract: "SOLR" },
  { symbol: "xtag_usdt", contract: "XTAG" },
  { symbol: "wnz_usdt", contract: "WNZ" },
  { symbol: "tulip_usdt", contract: "TULIP" },
  { symbol: "wag_usdt", contract: "WAG" },
  { symbol: "aart_usdt", contract: "AART" },
  { symbol: "cstr_usdt", contract: "CSTR" },
  { symbol: "taki_usdt", contract: "TAKI" },
  { symbol: "delfi_usdt", contract: "DELFI" },
  { symbol: "blt_usdt", contract: "BLT" },
  { symbol: "oxy_usdt", contract: "OXY" },
  { symbol: "ip3_usdt", contract: "IP3" },
  { symbol: "defiland_usdt", contract: "DFL" },
  { symbol: "block_usdt", contract: "BLOCK" },
  { symbol: "svt_usdt", contract: "SVT" },
  { symbol: "larix_usdt", contract: "LARIX" },
  { symbol: "unq_usdt", contract: "UNQ" },
  { symbol: "dust_usdt", contract: "DUST" },
  { symbol: "scy_usdt", contract: "SCY" },
  { symbol: "slnd_usdt", contract: "SLND" },
  { symbol: "apricot_usdt", contract: "APT" },
  { symbol: "ats_usdt", contract: "ATS" },
  { symbol: "rin_usdt", contract: "RIN" },
  { symbol: "sny_usdt", contract: "SNY" },
  { symbol: "sonar_usdt", contract: "SONAR" },
  { symbol: "mplx_usdt", contract: "MPLX" },
  { symbol: "gofx_usdt", contract: "GOFX" },
  { symbol: "prism_usdt", contract: "PRISM" },
  { symbol: "ratio_usdt", contract: "RATIP" },
  { symbol: "chicks_usdt", contract: "CHICKS" },
  { symbol: "mdf_usdt", contract: "MDF" }
];

let al, sat;
setInterval(() => {
  tokens.forEach((token) => {
    // Get the ask and bid prices for the token from Huobi
    https.get(`https://data.gateapi.io/api2/1/ticker/${token.symbol}`, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          if(!json.highestBid || !json.lowestAsk ) return;
          const ask = json.lowestAsk;
          const bid = json.highestBid;

          // Get the price of the token on the BSC network from Dex.guru
          https.get(`https://api.dex.guru/v1/tokens/${token.contract}`, (res) => {
            let data = "";
            res.on("data", (chunk) => {
              data += chunk;
            });
            res.on("end", () => {
              try {
                const json = JSON.parse(data);
                let price = json.priceUSD;
                // Get the price of the token on the BSC network from Jup.ag
                https.get(`https://price.jup.ag/v1/price?id=${token.contract}`, (res) => {
                  let data = "";
                  res.on("data", (chunk) => {
                    data += chunk;
                  });
                  res.on("end", () => {
                    try {
                      const json = JSON.parse(data);
                      let jupPrice = json.data.price;
                      // Calculate the ratio of the Gate ask price to the BSC price
                      token.al_dex = price / bid;
                      token.al_jup = jupPrice / bid;
                      token.sat_dex = price / ask;
                      token.sat_jup = jupPrice / ask;
                      console.log(token);
                    } catch (err) {
                      console.log("Error: " + err.message);
                    }
                  });
                }).on("error", (err) => {
                  console.log("Error: " + err.message);
                });
              } catch (err) {
                console.log("Error: " + err.message);
              }
            });
        }).on("error", (err) => {
          console.log("Error: " + err.message);
        });
      } catch (err) {
        console.log("Error: " + err.message);
      }
    });
  }).on("error", (err) => {
  console.log("Error: " + err.message);
});
});
}, 30000);


app.get("/", (req, res) => {
  function format_number(num) {
    if (num !== undefined) {
      return num.toFixed(3);
    }
    return '';
  }
  
  res.send(`
    <h1>Token List</h1>
    <table>
      <tr>
        <th>Symbol</th>
        <th>BSC/Huobi Bid Ratio</th>
        <th>Huobi/BSC Ask Ratio</th>
        <th>Jup/Huobi Ask Ratio</th>
        <th>Huobi/Jup Ask Ratio</th>
      </tr>
      ${tokens.map(token => {
        if (token.al_dex < 0.99 || token.sat_dex > 1.01 || token.sat_jup > 1.01 || token.al_jup < 0.99) {
          return `
            <tr>
              <td>${token.symbol}</td>
              <td style="color:${token.al_dex < 0.95 ? 'green' : 'inherit'}">${format_number(token.al_dex) < 0.99 ? format_number(token.al_dex) : ''}</td>
              <td style="color:${token.sat_dex > 1.05 ? 'red' : 'inherit'}">${format_number(token.sat_dex) > 1.01 ? format_number(token.sat_dex) : ''}</td>
              <td style="color:${token.al_jup < 0.95 ? 'green' : 'inherit'}">${format_number(token.al_jup) < 0.99 ? format_number(token.al_jup) : ''}</td>
              <td style="color:${token.sat_jup > 1.05 ? 'red' : 'inherit'}">${format_number(token.sat_jup) > 1.01 ? format_number(token.sat_jup) : ''}</td>
            </tr>
          `;
        }
        return '';
      }).join('')}
    </table>
  `);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
