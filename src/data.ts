export interface Channel {
  id: string;
  name: string;
  url: string;
  cat: string;
  logo: string;
}

export const CATEGORIES = [
  "all",
  "Bangladesh",
  "Cartoon",
  "Documentary",
  "Entertainment",
  "FIFA World Cup",
  "Movies",
  "Music",
  "News",
  "Pakistan",
  "Sports"
];

export const channels: Channel[] = [
  {
    id: "redbull-tv",
    name: "Red Bull TV",
    url: "https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8",
    cat: "Sports",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Red_Bull_TV_logo.svg/1024px-Red_Bull_TV_logo.svg.png"
  },
  {
    id: "fubo-sports",
    name: "Fubo Sports Network",
    url: "https://fubosports.amagi.tv/playlist.m3u8",
    cat: "Sports",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Fubo_Sports_Network_logo.svg/1200px-Fubo_Sports_Network_logo.svg.png"
  },
  {
    id: "pga-tour",
    name: "PGA Tour",
    url: "https://pgatour.amagi.tv/playlist.m3u8",
    cat: "Sports",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/ef/PGA_Tour_logo.svg/1200px-PGA_Tour_logo.svg.png"
  },
  {
    id: "cbs-sports",
    name: "CBS Sports HQ",
    url: "https://cbsn-cbsn.amagi.tv/playlist.m3u8",
    cat: "Sports",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/CBS_Sports_HQ_logo.svg/2560px-CBS_Sports_HQ_logo.svg.png"
  },
  {
    id: "world-poker-tour",
    name: "World Poker Tour",
    url: "https://worldpokertour-roku.amagi.tv/playlist.m3u8",
    cat: "Sports",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7b/World_Poker_Tour_logo.svg/1200px-World_Poker_Tour_logo.svg.png"
  },
  {
    id: "billiard-tv",
    name: "Billiard TV",
    url: "https://billiardtv.amagi.tv/playlist.m3u8",
    cat: "Sports",
    logo: "https://i.postimg.cc/pTKVz15Q/Billiard-TV.png"
  },
  {
    id: "12305",
    name: "Caze Tv Brasil",
    url: "https://dfr80qz435crc.cloudfront.net/MNOP/Amagi/Caze/Caze_TV_BR/1080p-vtt/index.m3u8",
    cat: "FIFA World Cup",
    logo: "https://stream.codecloud.bd/uploads/logos/logo_6a2a39c4ac184.png"
  },
  {
    id: "12306",
    name: "Caze Tv Server 2",
    url: "https://dfr80qz435crc.cloudfront.net/MNOP/Amagi/Caze/Caze_TV_BR/Caze_TV.m3u8",
    cat: "FIFA World Cup",
    logo: "https://stream.codecloud.bd/uploads/logos/logo_6a2a3938aca1c.png"
  },
  {
    id: "12317",
    name: "FIFA Plus B \ud83c\udfc6",
    url: "https://37b4c228.wurl.com/manifest/f36d25e7e52f1ba8d7e56eb859c636563214f541/UmFrdXRlblRWLWZyX0ZJRkFQbHVzRnJlbmNoX0hMUw/6f5437c5-e015-4754-8476-c8c6d27d3a55/1.m3u8",
    cat: "Sports",
    logo: "https://i.ibb.co.com/vnbkF0r/fifa-world-cup-2026-logo-png-seeklogo-665644.png"
  },
  {
    id: "12307",
    name: "Bein Sports XTRA",
    url: "https://amg01334-amg01334c2-freelivesports-emea-6791.playouts.now.amagi.tv/playlist/amg01334-beinxtra-beinxtrausapp-freelivesportsemea/playlist.m3u8",
    cat: "FIFA World Cup",
    logo: "https://stream.codecloud.bd/uploads/logos/logo_6a2a39fb56eec.jpeg"
  },
  {
    id: "12318",
    name: "FIFA Plus \ud83c\udde6\ud83c\uddf7 Argentina",
    url: "https://6c849fb3.wurl.com/master/f36d25e7e52f1ba8d7e56eb859c636563214f541/TEctbXhfRklGQVBsdXNTcGFuaXNoLTFfSExT/playlist.m3u8",
    cat: "Sports",
    logo: "https://i.ibb.co.com/vnbkF0r/fifa-world-cup-2026-logo-png-seeklogo-665644.png"
  },
  {
    id: "12312",
    name: "Somoy Tv",
    url: "https://sm-monirul.top/toffee/play/somoy_tv.m3u8",
    cat: "Bangladesh",
    logo: "https://stream.codecloud.bd/uploads/logos/logo_6a2a3badb5621.png"
  },
  {
    id: "12316",
    name: "Somoy Tv Server 2",
    url: "https://tvsen6.aynaott.com/somoytv/index.m3u8",
    cat: "Bangladesh",
    logo: "https://stream.codecloud.bd/uploads/logos/logo_6a2a3c6c0f9b5.png"
  },
  {
    id: "12314",
    name: "T Sports HD",
    url: "https://tvsen7.aynaott.com/tsports-hd/index.m3u8",
    cat: "Bangladesh",
    logo: "https://stream.codecloud.bd/uploads/logos/logo_6a2a3c3cf15b8.png"
  },
  {
    id: "12420",
    name: "Channel 1 TV",
    url: "https://app24.jagobd.com.bd/c3VydmVyX8RpbEU9Mi8xNy8yMFDEEHGcfRgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcEdsEfeDeKiNkVN3PTOmdFseWRtaW51aiPhnPTI2/channel1bd.stream/tracks-v1a1/mono.m3u8",
    cat: "Bangladesh",
    logo: "https://i.ibb.co.com/N6HbH5rH/Channel-One-TV.png"
  },
  {
    id: "12313",
    name: "Ptv Sports",
    url: "https://tvsen5.aynaott.com/PtvSports/index.m3u8",
    cat: "Pakistan",
    logo: "https://stream.codecloud.bd/uploads/logos/logo_6a2a3bdf4d3da.jpg"
  },
  {
    id: "12324",
    name: "Tyc Sports \ud83c\udde6\ud83c\uddf7 Argentina",
    url: "https://amg26268-amg26268c14-freelivesports-emea-10267.playouts.now.amagi.tv/ts-us-e2-n2/playlist/amg26268-sportsstudio-tycsports-freelivesportsemea/playlist.m3u8",
    cat: "Sports",
    logo: "https://imglink.cc/cdn/1oSRQnyUqK.jpg"
  },
  {
    id: "12323",
    name: "Fox Sports 2 - (FIFA)",
    url: "https://tvsen7.aynaott.com/foxsports2/index.m3u8",
    cat: "Sports",
    logo: "https://imglink.cc/cdn/o5BoWU_BEz.png"
  },
  {
    id: "12315",
    name: "Btv",
    url: "https://tvsen6.aynaott.com/btvhd/index.m3u8",
    cat: "Bangladesh",
    logo: "https://stream.codecloud.bd/uploads/logos/logo_6a2a3c575ce13.png"
  },
  {
    id: "12356",
    name: "Bein Sports 4",
    url: "https://bein-esp-xumo.amagi.tv/playlistR1080p.m3u8",
    cat: "Sports",
    logo: "https://imglink.cc/cdn/kIiut6WBq0.jpg"
  },
  {
    id: "12364",
    name: "Euro TV",
    url: "https://stream.ottplus.bd/live/euro_sports_hd_abr/live/euro_sports_hd/chunks.m3u8",
    cat: "Sports",
    logo: "https://imglink.cc/cdn/SZphbKsSMx.png"
  },
  {
    id: "12365",
    name: "Star Sports 1",
    url: "https://tvsen7.aynaott.com/sspts1/tracks-v1a1/mono.ts.m3u8",
    cat: "Sports",
    logo: "https://imglink.cc/cdn/va7WOdXDQC.jpg"
  },
  {
    id: "12374",
    name: "Star Jalsha",
    url: "https://yupptvcatchupire.yuppcdn.net/preview/starjalsha/1800.m3u8",
    cat: "Entertainment",
    logo: "https://imglink.cc/cdn/3TXPVSGzx5.png"
  },
  {
    id: "12367",
    name: "Cricket Gold",
    url: "https://streams2.sofast.tv/ptnr-yupptv/title-cricketgold/v1/manifest/611d79b11b77e2f571934fd80ca1413453772ac7/b2048bb8-1686-4432-aa50-647245383e0c/bfc6a36e-c250-4afe-b6c9-2bc57855bb7d/4.m3u8",
    cat: "Sports",
    logo: "https://imglink.cc/cdn/HMfImxTUXS.jpg"
  },
  {
    id: "12369",
    name: "ASports",
    url: "https://tvsen6.aynaott.com/asports/index.m3u8",
    cat: "Sports",
    logo: "https://imglink.cc/cdn/d4W6mvjalX.png"
  },
  {
    id: "12379",
    name: "G Series Drama",
    url: "https://vods2.aynaott.com/gseriesDrama/tracks-v1a1/mono.ts.m3u8",
    cat: "Entertainment",
    logo: "https://imglink.cc/cdn/1_dUKmt1Oe.png"
  },
  {
    id: "12381",
    name: "Goldmines",
    url: "https://cdn-2.pishow.tv/live/1459/master.m3u8",
    cat: "Movies",
    logo: "https://imglink.cc/cdn/E86bN6IAxl.jpg"
  },
  {
    id: "12384",
    name: "Jalsha Movies",
    url: "http://198.195.239.50:8095/JalshaMovies/tracks-v1a1/mono.m3u8",
    cat: "Movies",
    logo: "https://imglink.cc/cdn/hEzUhoTW3x.jpg"
  },
  {
    id: "12386",
    name: "South India Movie",
    url: "https://live20.bozztv.com/giatvplayout7/giatv-209593/tracks-v1a1/mono.ts.m3u8",
    cat: "Movies",
    logo: "https://imglink.cc/cdn/cScI5tEUjV.png"
  },
  {
    id: "12387",
    name: "B4U Movies",
    url: "https://amg00877-b4unew-amg00877c2-xiaomi-in-5489.playouts.now.amagi.tv/playlist.m3u8",
    cat: "Movies",
    logo: "https://imglink.cc/cdn/cScI5tEUjV.png"
  },
  {
    id: "12389",
    name: "Sony Max",
    url: "https://edge2.roarzone.net:8447/roarzone/edge3/sony_max_hd/index.m3u8",
    cat: "Movies",
    logo: "https://imglink.cc/cdn/4mRBs1A-x_.png"
  },
  {
    id: "12391",
    name: "Star Gold",
    url: "http://198.195.239.50:8095/StarGold/index.m3u8",
    cat: "Movies",
    logo: "https://imglink.cc/cdn/Nkj7hqlPz-.jpg"
  },
  {
    id: "12392",
    name: "9X Tashan",
    url: "https://wiselp.wiseplayout.com/9X_Tashan/master.m3u8",
    cat: "Music",
    logo: "https://imglink.cc/cdn/IYDn_LwwiV.png"
  },
  {
    id: "12396",
    name: "Bengali Beat",
    url: "https://tplay.live/originals/bengali-beats/index.m3u8",
    cat: "Music",
    logo: "https://imglink.cc/cdn/IYDn_LwwiV.png"
  },
  {
    id: "12400",
    name: "Motu Patlu",
    url: "https://live20.bozztv.com/giatvplayout7/giatv-209622/tracks-v1a1/mono.ts.m3u8",
    cat: "Cartoon",
    logo: "https://imglink.cc/cdn/TxPUulKGQh.jpg"
  },
  {
    id: "12401",
    name: "Tom & Jerry TV",
    url: "https://live20.bozztv.com/giatvplayout7/giatv-208314/tracks-v1a1/mono.ts.m3u8",
    cat: "Cartoon",
    logo: "https://imglink.cc/cdn/YkXRQgC4-_.jpg"
  },
  {
    id: "12405",
    name: "Doraemon TV",
    url: "https://live20.bozztv.com/giatvplayout7/giatv-209902/tracks-v1a1/mono.ts.m3u8",
    cat: "Cartoon",
    logo: "https://imglink.cc/cdn/rmNeL8f6NR.png"
  },
  {
    id: "12408",
    name: "Cartoon Network",
    url: "https://tvsen5.aynaott.com/cartoonnetwork/tracks-v1a1/mono.ts.m3u8",
    cat: "Cartoon",
    logo: "https://imglink.cc/cdn/48br-Lpr61.png"
  },
  {
    id: "12410",
    name: "Duronto Live",
    url: "https://tvsen6.aynaott.com/durontotv-live/index.m3u8",
    cat: "Cartoon",
    logo: "https://i.ibb.co.com/Ld3Yw0PH/Duronto-TV.png"
  },
  {
    id: "12421",
    name: "Channel 24",
    url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1703/output/1703-audio_113332_eng=113200-video=2202800.m3u8",
    cat: "Bangladesh",
    logo: "https://i.ibb.co.com/v65cfQ96/Channel-24.png"
  },
  {
    id: "12424",
    name: "DBC News",
    url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1728/output/index.m3u8",
    cat: "Bangladesh",
    logo: "https://i.ibb.co.com/TMKLMXs9/DBC-News.png"
  },
  {
    id: "12428",
    name: "Ekattor TV HD",
    url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1705/output/1705.m3u8",
    cat: "Bangladesh",
    logo: "https://i.ibb.co.com/DPZrfqzr/Ekattor-TV-HD.png"
  },
  {
    id: "12446",
    name: "Republic Bangla",
    url: "https://vg-republictvlive.akamaized.net/v1/manifest/611d79b11b77e2f571934fd80ca1413453772ac7/vglive-sk-456368/06e5afc2-a022-4e51-9131-4e33a6207c5c/1.m3u8",
    cat: "News",
    logo: "https://imglink.cc/cdn/ndYg8AR85Y.jpg"
  },
  {
    id: "12451",
    name: "Adventure Earth",
    url: "https://autentic-adventure-earth-1-eu.rakuten.wurl.tv/playlist.m3u8",
    cat: "Documentary",
    logo: "https://imglink.cc/cdn/eEZmseF3Tb.jpg"
  },
  {
    id: "12452",
    name: "BBC Earth",
    url: "https://amg00793-amg00793c6-xumo-us-2669.playouts.now.amagi.tv/BBCStudios-BBCEarthA-hls/playlist540p.m3u8",
    cat: "Documentary",
    logo: "https://imglink.cc/cdn/eEZmseF3Tb.jpg"
  },
  {
    id: "12454",
    name: "Animal Planet",
    url: "https://tiger-hub.vercel.app@vodzong.mjunoon.tv:8087/streamtest/Animal-Planet-158-3/playlist.m3u8",
    cat: "Documentary",
    logo: "https://imglink.cc/cdn/ebC033LNf2.png"
  }
];
