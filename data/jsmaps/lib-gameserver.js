const GameServers = new Map();
//NFI
//yagaMapped
GameServers.set("Harmony", { name: "Harmony", size:"4096x4096",founded:"2020-07-24",type:"pve", short:"Har", cluster:"Northern Freedom Isles", address: "harmony.game.wurmonline.com",yaga:"harmony.yaga.host" });
GameServers.set("Melody", { name: "Melody", size:"2048x2048",founded:"2020-07-26",type:"pve", short:"Mel" , cluster:"Northern Freedom Isles", address: "melody.game.wurmonline.com",yaga:"meloddy.yaga.host" });
GameServers.set("Cadence", { name: "Cadence", size:"4096x4096", founded:"2020-08-21",type:"pve", short:"Cad" ,cluster:"Northern Freedom Isles", address: "cadence.game.wurmonline.com",yaga:"cadence.yaga.host" });
//others
GameServers.set("Defiance", { name: "Defiance", size:"4096x4096", short:"Def", founded:"2020-07-24", type:"pvp-own", cluster:"Northern Freedom Isles", address: "defiance.game.wurmonline.com",yaga:false });
//SFI
GameServers.set("Independence", { name: "Independence", short:"Ind",founded:"2009-07-17",size:"4096x4096",type:"pve-pvp-limited", cluster:"Southern Freedom Isles", address: "freedom001.game.wurmonline.com",yaga:false });
GameServers.set("Deliverance", { name: "Deliverance", short:"Del" ,founded:"2011-09-07",size:"2048x2048",type:"pve-pvp-limited", cluster:"Southern Freedom Isles", address: "freedom002.game.wurmonline.com",yaga:"deliverance.yaga.host"});
GameServers.set("Exodus", { name: "Exodus", short:"Exo" , founded:"2011-09-15",size:"2048x2048",type:"pve-pvp-limited", cluster:"Southern Freedom Isles", address: "freedom003.game.wurmonline.com",yaga:"exodus.yaga.host"});
GameServers.set("Celebration", { name: "Celebration", short:"Cel" ,founded:"2012-05-31",size:"2048x2048",type:"pve-pvp-limited", cluster:"Southern Freedom Isles", address: "celebration.live.wurmonline.io",yaga:"celebration.yaga.host"});
GameServers.set("Pristine", { name: "Pristine", short:"Pri" ,founded:"2012-12-12",size:"2048x2048",type:"pve-pvp-limited", cluster:"Southern Freedom Isles", address: "freedom005.game.wurmonline.com",yaga:false});
GameServers.set("Release", { name: "Release", short:"Rel" ,founded:"2014-07-03",size:"2048x2048",type:"pve-pvp-limited", cluster:"Southern Freedom Isles", address: "freedom006.game.wurmonline.com",yaga:"release.yaga.host"});
GameServers.set("Xanadu", { name: "Xanadu", short:"Xan",founded:"2014-06-18",size:"8192x8192",type:"pve-pvp-limited", cluster:"Southern Freedom Isles", address: "freedom007.game.wurmonline.com",yaga:"xanadu.yaga.host"});
GameServers.set("Chaos", { name: "Chaos", short:"Cha",founded:"2007-05-05",size:"4096x4096",type:"pve", cluster:"Southern Freedom Isles", address: "freedom007.game.wurmonline.com",yaga:"xanadu.yaga.host"});
//Epic
GameServers.set("Elevation", { name: "Elevation", short:"Ele", founded:"2019-07-06",size:"2048x2048",type:"pvp", cluster:"Epic Islands", address: "elevation.game.wurmonline.com",yaga:false});
GameServers.set("Desertion", { name: "Desertion", short:"Des", founded:"2011-11-01",size:"2048x2048",type:"pve-kd-rating", cluster:"Epic Islands", address: "desertion.wurmonline.com",yaga:false});
GameServers.set("Affliction", { name: "Affliction", short:"Aff", founded:"2014-10-10",size:"2048x2048",type:"pve-kd-rating", cluster:"Epic Islands", address: "affliction.wurmonline.com",yaga:false});
GameServers.set("Serenity", { name: "Serenity", short:"Ser" , founded:"2011-11-01",size:"2048x2048",type:"pve-kd-rating", cluster:"Epic Islands", address: "serenity.wurmonline.com",yaga:false});

//console.log("size:" +GameServers.size +"," +GameServers.get("Harmony".name)); // 1
if (!inBrowser) {
module.exports=GameServers;
}

