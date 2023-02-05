const express = require('express');
const https = require('https');
const app = express();
const tokens = [
  { symbol: "ZBC-USDT", contract: "ZBC" },
  { symbol: "SLCL-USDT", contract: "SLCL" },
  { symbol: "PLD-USDT", contract: "PLD" },
  { symbol: "GST-USDT", contract: "GST" },
  { symbol: "HAWK-USDT", contract: "HAWK" },
  { symbol: "GMT-USDT", contract: "GMT" },
  { symbol: "RACEFI-USDT", contract: "RACEFI" },
  { symbol: "GARI-USDT", contract: "GARI" },
  { symbol: "SLIM-USDT", contract: "SLIM" },
  { symbol: "SRM-USDT", contract: "SRM" },
  { symbol: "HBB-USDT", contract: "HBB" },
  { symbol: "FCON-USDT", contract: "FCON" },
  { symbol: "FIDA-USDT", contract: "FIDA" },
  { symbol: "LIKE-USDT", contract: "LIKE" },
  { symbol: "AURY-USDT", contract: "AURY" },
  { symbol: "XTAG-USDT", contract: "XTAG" },
  { symbol: "CWAR-USDT", contract: "CWAR" },
  { symbol: "SHILL-USDT", contract: "SHILL" },
  { symbol: "SOLR-USDT", contract: "SOLR" },
  { symbol: "XTM-USDT", contract: "0xCd1fAFf6e578Fa5cAC469d2418C95671bA1a62Fe-bsc" },
  { symbol: "TLM-USDT", contract: "0x2222227e22102fe3322098e4cbfe18cfebd57c95-bsc" },
  { symbol: "TRVL-USDT", contract: "0x6a8Fd46F88dBD7bdC2D536C604f811C63052ce0F-bsc" },
  { symbol: "TAUM-USDT", contract: "0x02e22eb7f6e73ef313dd71248cd164b1bdc5aadd-bsc" },
  { symbol: "DPR-USDT", contract: "0xa0a2ee912caf7921eaabc866c6ef6fec8f7e90a4-bsc" },
  { symbol: "DREAMS-USDT", contract: "0x54523d5fb56803bac758e8b10b321748a77ae9e9-bsc" },
  { symbol: "OLE-USDT", contract: "0xa865197A84E780957422237B5D152772654341F3-bsc" },  
  { symbol: "TRIAS-USDT", contract: "0xa4838122c683f732289805fc3c207febd55babdd-bsc" }, 
  { symbol: "POLC-USDT", contract: "0x6ae9701b9c423f40d54556c9a443409d79ce170a-bsc" },
  { symbol: "STARLY-USDT", contract: "0xb0a480e2fa5af51c733a0af9fcb4de62bc48c38b-bsc" },
  { symbol: "URUS-USDT", contract: "0xc6dddb5bc6e61e0841c54f3e723ae1f3a807260b-bsc" },
  { symbol: "AFK-USDT", contract: "0x39CFEaBCeC0F37BD37D9c122aE047D6433F44235-bsc" },
  { symbol: "LACE-USDT", contract: "0xa3499dd7dbbbd93cb0f8303f8a8ace8d02508e73-bsc" },
  { symbol: "REV3L-USDT", contract: "0x30B5E345C79255101B8af22a19805A6fb96DdEBb-bsc" },
  { symbol: "WAL-USDT", contract: "0xd306c124282880858a634e7396383ae58d37c79c-bsc" },
  { symbol: "PEL-USDT", contract: "0xa75e7928d3de682e3f44da60c26f33117c4e6c5c-bsc" },
  { symbol: "ERTHA-USDT", contract: "0x62823659d09F9F9D2222058878f89437425eB261-bsc" },
  { symbol: "MOOV-USDT", contract: "0x0ebd9537a25f56713e34c45b38f421a1e7191469-bsc" },
  { symbol: "HOTCROSS-USDT", contract: "0x4fa7163e153419e0e1064e418dd7a99314ed27b6-bsc" },
  { symbol: "SWINGBY-USDT", contract: "0x71de20e0c4616e7fcbfdd3f875d568492cbe4739-bsc" },
  { symbol: "POLX-USDT", contract: "0x187ae45f2d361cbce37c6a8622119c91148f261b-polygon" },
  { symbol: "BLOK-USDT", contract: "0xA0d96fD642156FC7E964949642257b3572f10cD6-bsc" },
  { symbol: "BLOK-USDT", contract: "0x229b1b6c23ff8953d663c4cbb519717e323a0a84-polygon" },
  { symbol: "IXS-USDT", contract: "0x1ba17c639bdaecd8dc4aac37df062d17ee43a1b8-polygon" },
  { symbol: "SWP-USDT", contract: "0xabEDe05598760E399ed7EB24900b30C51788f00F-polygon" },
  { symbol: "NAKA-USDT", contract: "0x311434160D7537be358930def317AfB606C0D737-polygon" },
  { symbol: "WOMBAT-USDT", contract: "0x0C9c7712C83B3C70e7c5E11100D33D9401BdF9dd-polygon" },
  { symbol: "VOXEL-USDT", contract: "0xd0258a3fd00f38aa8090dfee343f10a9d4d30d3f-polygon" },
  { symbol: "UPO-USDT", contract: "0x9dbfc1cbf7a1e711503a29b4b5f9130ebeccac96-polygon" },
  { symbol: "FLAME-USDT", contract: "0x22e3f02f86bc8ea0d73718a2ae8851854e62adc5-polygon" },
  { symbol: "MV-USDT", contract: "0xA3c322Ad15218fBFAEd26bA7f616249f7705D945-polygon" },
  { symbol: "BULL-USDT", contract: "0x9f95e17b2668afe01f8fbd157068b0a4405cc08d-polygon" },
  { symbol: "IHC-USDT", contract: "0x86a53fcd199212FEa44FA7e16EB1f28812be911D-bsc" },
  { symbol: "DPET-USDT", contract: "0xfb62ae373aca027177d1c18ee0862817f9080d08-bsc" },
  { symbol: "NUM-USDT", contract: "0xeceb87cf00dcbf2d4e2880223743ff087a995ad9-bsc" },
  { symbol: "TLOS-USDT", contract: "0xb6c53431608e626ac81a9776ac3e999c5556717c-bsc" },
  { symbol: "RFOX-USDT", contract: "0x0a3a21356793b49154fd3bbe91cbc2a16c0457f5-bsc" },
  { symbol: "GAFI-USDT", contract: "0x89Af13A10b32F1b2f8d1588f93027F69B6F4E27e-bsc" },
  { symbol: "MNST-USDT", contract: "0x6a6ccf15b38da4b5b0ef4c8fe9fefcb472a893f9-bsc" },
  { symbol: "XCN-USDT", contract: "0x7324c7C0d95CEBC73eEa7E85CbAac0dBdf88a05b-bsc" },
  { symbol: "ARKER-USDT", contract: "0x9c67638c4fa06fd47fb8900fc7f932f7eab589de-bsc" },
  { symbol: "ALPHA-USDT", contract: "0xa1faa113cbe53436df28ff0aee54275c13b40975-bsc" },
  { symbol: "ROSN-USDT", contract: "0x651cd665bd558175a956fb3d72206ea08eb3df5b-bsc" },
  { symbol: "ORAI-USDT", contract: "0xA325Ad6D9c92B55A3Fc5aD7e412B1518F96441C0-bsc" },
  { symbol: "INJ-USDT", contract: "0xa2b726b1145a4773f68593cf171187d8ebe4d495-bsc" },
  { symbol: "BETA-USDT", contract: "0xbe1a001fe942f96eea22ba08783140b9dcc09d28-bsc" },
  { symbol: "CEEK-USDT", contract: "0xe0f94ac5462997d2bc57287ac3a3ae4c31345d66-bsc" },
  { symbol: "SCLP-USDT", contract: "0xF2c96E402c9199682d5dED26D3771c6B192c01af-bsc" },
  { symbol: "MTS-USDT", contract: "0x496cC0b4ee12Aa2AC4c42E93067484e7Ff50294b-bsc" },
  { symbol: "DAR-USDT", contract: "0x23ce9e926048273ef83be0a3a8ba9cb6d45cd978-bsc" },
  { symbol: "SFUND-USDT", contract: "0x477bc8d23c634c154061869478bce96be6045d12-bsc" },
  { symbol: "SON-USDT", contract: "0x3b0E967cE7712EC68131A809dB4f78ce9490e779-bsc" },
  { symbol: "MTV-USDT", contract: "0x8aa688ab789d1848d131c65d98ceaa8875d97ef1-bsc" },
  { symbol: "MARSH-USDT", contract: "0x2FA5dAF6Fe0708fBD63b1A7D1592577284f52256-bsc" },
  { symbol: "MTRG-USDT", contract: "0xbd2949f67dcdc549c6ebe98696449fa79d988a9f-bsc" },
  { symbol: "SIN-USDT", contract: "0x6397de0f9aedc0f7a8fa8b438dde883b9c201010-bsc" },
  { symbol: "GGG-USDT", contract: "0xd8047afecb86e44eff3add991b9f063ed4ca716b-bsc" },
  { symbol: "RACA-USDT", contract: "0x12BB890508c125661E03b09EC06E404bc9289040-bsc" },
  { symbol: "CHMB-USDT", contract: "0x5492Ef6aEebA1A3896357359eF039a8B11621b45-bsc" },
  { symbol: "TKO-USDT", contract: "0x9f589e3eabe42ebc94a44727b3f3531c0c877809-bsc" },
  { symbol: "MBOX-USDT", contract: "0x3203c9e46ca618c8c1ce5dc67e7e9d75f5da2377-bsc" },
  { symbol: "WOOP-USDT", contract: "0x8b303d5bbfbbf46f1a4d9741e491e06986894e18-bsc" },
  { symbol: "NFTB-USDT", contract: "0xde3dbbe30cfa9f437b293294d1fd64b26045c71a-bsc" },
  { symbol: "FCD-USDT", contract: "0xf78610D0a197842bF98ca45254897edd13c5D182-polygon" },
  { symbol: "UPO-USDT", contract: "0x9dbfc1cbf7a1e711503a29b4b5f9130ebeccac96-polygon" }
];

let al, sat;
setInterval(() => {
  tokens.forEach((token) => {
    // Get the ask and bid prices for the token from Kucoin
    https.get(`https://api.kucoin.com/api/v1/market/stats?symbol=${token.symbol}`, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          if(!json.data || !json.data.buy || !json.data.sell) return;
          const ask = json.data.sell;
          const bid = json.data.buy;

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
                      // Calculate the ratio of the Kucoin ask price to the BSC price
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
  res.send(`
    <h1>Token List</h1>
    <table>
      <tr>
        <th>Symbol</th>
        <th>Contract Address</th>
        <th>BSC/Kucoin Bid Ratio</th>
        <th>Kucoin/BSC Ask Ratio</th>
        <th>Jup/Kucoin Ask Ratio</th>
        <th>Kucoin/Jup Ask Ratio</th>
      </tr>
      ${tokens.map(token => {
        if (token.al_dex < 0.98 || token.sat_dex > 1.02 || token.sat_jup > 1.01 || token.al_jup < 0.99) {
          return `
            <tr>
              <td>${token.symbol}</td>
              <td>${token.contract}</td>
              <td>${token.al_dex < 0.99 ? token.al_dex : ''}</td>
              <td>${token.sat_dex > 1.00 ? token.sat_dex : ''}</td>
              <td>${token.al_jup < 0.99 ? token.al_jup : ''}</td>
              <td>${token.sat_jup > 1.00 ? token.sat_jup : ''}</td>
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

