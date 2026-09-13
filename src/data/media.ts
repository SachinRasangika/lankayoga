export const media = {
  heroShala: "/b946c85a-4d8f-485e-a65e-18cfcb95288a.jpg",
  therapyRoom: "/92417d66-7bfd-4fb5-9612-7abb6b0b6f17.jpg",
  ecoCabin: "/90be5c05-59ad-4cd7-8a28-6ddcd1ea9464.jpg",
  herbalApothecary: "/807cd2d7-7142-4496-bd4b-0c29e250e853.jpg",
  campusAerial: "/ad155795-ce80-423b-a7ed-f9899b26319d.jpg",
  yttPractice: "/756392b9-dc19-438d-a99d-cde8a26c565f.jpg",
  teacherMaya: "/221cf92f-79bf-4d9f-b0c5-b3d03a28b09e.jpg",
  teacherRanil: "/d4c5d7ab-f0a4-4515-8743-4baccf513443.jpg",
  teacherAnjali: "/7006eef6-1ee4-46cd-9a4f-6bd9a23a24bd.jpg",
  villageKitchen: "/0780fe89-1b67-4d0e-b095-498826560443.jpg",
  dawnCanoe: "/fc6b8f22-ea83-4ec6-92f6-f4193a51bb8e.jpg",
  candleMeditation: "/cf068b9c-e64b-4ba4-88df-2a7d9f461f2f.jpg",
  oilHands: "/0b61b114-fcf2-40e9-9d48-1821596215c1.jpg",
  rainLeaves: "/99a867c5-0580-429a-9550-aebd4e327920.jpg",
  jettySunset: "/a9f90d32-73dd-429c-8f92-903ffab17ed0.jpg",
  palmPath: "/5db6f804-6a20-4fa8-b7c1-177cb72976c2.jpg",
  verandahRest: "/2df3ffd5-d0c0-4715-8a97-b292fcba7b36.jpg",
  herbalTea: "/f03d36cb-45fd-46e8-95bf-f27e908176bb.jpg",
  lotusPond: "/759b855e-ead4-4823-9ca9-24eb523fef17.jpg",
  mistHills: "/2e8301d4-6de1-4fd8-b6f7-35d500417dc5.jpg",
  waterRipple: "/53187688-8524-4bd4-8ec9-a1edff4542de.jpg",
  floatingFlowers: "/3bf83134-6986-4791-8e68-76c4f3d5f519.jpg",
  openWindow: "/d4537187-7050-4ae3-94de-4694d8d859db.jpg",
  nightLamps: "/e4bff860-894b-4d08-be0a-1426670a9403.jpg",
  hammockLake: "/d35d0faf-4449-4d2e-83e1-d1cf7e1d3e37.jpg",
  singingBowl: "/a3efbd16-a36e-402c-b1ec-c5ab15ba31ca.jpg",
  gardenHerbs: "/8d0a2e76-b5dc-4258-af0f-479412c1a0e0.jpg",
  handsMudra: "/90298f71-f6de-41b1-9663-ef7ac1a26aef.jpg",
  steamBath: "/c2402952-3522-48a7-ab0c-46bf7c31a1f9.jpg",
  lakeWideDawn: "/9d582bc0-a235-4de7-8287-fe8f48d4c849.jpg",
  reedsEdge: "/ab5114c9-7156-4f1d-9205-de08374b7e12.jpg",
  stoneCarving: "/69fd9b03-063b-42d6-a7c4-849ef95515f8.jpg",
  linenBed: "/6cece923-b109-4b46-8403-77cb71a9c229.jpg",
  palmCanopySky: "/790956a4-b5ca-4546-8685-28d05a5b7ea5.jpg",
  rainWindow: "/9e8814a3-4f86-4bfb-8d69-58811b5eec66.jpg",
  paddyGold: "/350e6790-b5f7-4b2e-a2f6-af910bcace19.jpg",
  teaMist: "/97011ffc-978f-4a2b-a330-330599bfdb2e.jpg",
  orchidMacro: "/cb12c925-c0f5-412a-bc3a-3d0ae06d1b72.jpg",
  shalaEmpty: "/42e3e9a3-b2e9-4f21-a044-626013a96441.jpg",
  heroYtt: "/cfa8b5c3-b791-4b32-8f8f-4f71a6e131ff.jpg",
  heroShirodhara: "/8ce01688-b9ce-4d17-862a-d8d1fc03670c.jpg",
  heroRetreat: "/c0e4d6b6-32b7-4360-aa46-dd5066f4517a.jpg",
  heroVenue: "/6a917c8b-4560-497a-b753-6d726754fa09.jpg",
  practiceFeet: "/268c5574-a1e8-46b9-93b4-1c65ae010cdf.jpg",
  headMassage: "/cfad99d2-dc8b-4d38-8df1-1cf72729ef30.jpg",
  cabinInside: "/504ab046-2ad7-41a6-9867-90fd213f3f3a.jpg",
  clayKitchen: "/f2b680f6-ea85-4331-ba19-c25108085500.jpg",
  lakeSteps: "/83eb990a-6a6f-4312-b5ee-0edf0623b317.jpg",
  breakfastVerandah: "/db92a786-847f-4d8b-812f-197018ee5f0a.jpg",
  footBath: "/7c7e46a9-424d-4323-ab8a-f1d36bc9635f.jpg",
  readingNook: "/6077c2e1-6252-467f-b50c-b1a3cab417c4.jpg",
  duskChant: "/cc7dd4a4-5322-471b-a015-976308afffc9.jpg"
};

export interface TourScene {
  id: string;
  name: string;
  caption: string;
  image: string;
}

export const tourScenes: TourScene[] = [
{
  id: 'shala',
  name: 'Lakefront Shala',
  caption: '120 m² teak platform, open on three sides to the water.',
  image: media.heroShala
},
{
  id: 'shala-inside',
  name: 'Inside the Shala',
  caption: 'Props, bolsters and mats for twenty-six, stacked along the north side.',
  image: media.shalaEmpty
},
{
  id: 'accommodation',
  name: 'Eco Cabin',
  caption: 'Single-occupancy cabin with private verandah and garden shower.',
  image: media.ecoCabin
},
{
  id: 'therapy',
  name: 'Therapy Room',
  caption: 'One of six treatment rooms with dedicated steam chamber.',
  image: media.therapyRoom
},
{
  id: 'campus',
  name: 'Campus Grounds',
  caption: 'Nine acres of restored wetland, orchard and herb garden.',
  image: media.campusAerial
}];


export const galleryImages = [
{ src: media.heroShala, alt: 'Open-air teak shala at the edge of the lake at sunrise', span: 'wide' as const },
{ src: media.cabinInside, alt: 'Eco cabin interior with a bed draped in a mosquito net', span: 'tall' as const },
{ src: media.therapyRoom, alt: 'Ayurvedic treatment room with a carved wooden droni table', span: 'normal' as const },
{ src: media.herbalApothecary, alt: 'Dried Ayurvedic herbs and roots in brass and clay bowls', span: 'normal' as const },
{ src: media.lakeSteps, alt: 'Wooden steps leading down into the calm lake at dusk', span: 'wide' as const },
{ src: media.clayKitchen, alt: 'Clay pots simmering over a low wood fire in the campus kitchen', span: 'normal' as const }];