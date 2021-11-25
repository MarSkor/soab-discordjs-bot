const axios = require('axios');

const url = `https://api.mozambiquehe.re/maprotation?version=2&auth=${process.env.APEX_API_KEY}`
const statusUrl = `https://api.mozambiquehe.re/servers?auth=${process.env.APEX_API_KEY}`
const nextSplitUrl = `https://fn.alphaleagues.com/v2/apex/map/?next=1`

exports.getBrPubs = async() => {
  const res = await axios.get(url)
  .then(res => {
    return res.data.battle_royale;
  })
  console.log(res);
  return res;
}

exports.getBrRanked = async() => {
  const res = await axios.get(url)
  .then(res => {
    return res.data.ranked;
  })
  console.log(res);
  return res;
}

exports.getArPubs = async() => {
  const res = await axios.get(url)
  .then(res => {
    return res.data.arenas;
  })
  console.log(res);
  return res;
  
}

exports.getArRanked = async() => {
  const res = await axios.get(url)
  .then(res => {
    return res.data.arenasRanked;
  })
  console.log(res);
  return res;
}

exports.getAlStatus = async() => {
    const res = await axios.get(statusUrl)
    .then(res => {
      return res.data;
    })
    console.log(res);
    return res;
}

exports.getNextSplit = async() => {
  const res = await axios.get(nextSplitUrl)
  .then(res => {
    return res.data.br.ranked;
  })
  console.log(res);
  return res;
}


