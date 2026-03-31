export interface ResourceLink {
  label: string;
  url: string;
  note: string;
}

export interface ResourceSection {
  key: string;
  links: ResourceLink[];
}

export const resourceSections: ResourceSection[] = [
  {
    key: 'the_city',
    links: [
      { label: 'City of Miami Springs', url: 'https://www.miamisprings-fl.gov/', note: 'Official city government site' },
      { label: '100 Miami Springs — Centennial Site', url: 'https://www.100miamisprings.com/', note: 'Official centennial celebration' },
      { label: '100 Miami Springs — Our History', url: 'https://www.100miamisprings.com/our-history', note: 'Centennial timeline of Miami Springs history' },
      { label: 'Miami Springs Historical Museum', url: 'https://www.miamisprings-fl.gov/community/page/miami-springs-historical-museum', note: 'City of Miami Springs page for the Historical Society museum at 501 East Drive' },
      { label: 'Miami Springs Pueblo Style Architecture', url: 'https://www.miamisprings-fl.gov/community/page/pueblo-style-architecture', note: "City overview of the Pueblo Revival style, including attribution to James Bright's Southwest background" },
      { label: 'Lua Curtiss House #2 — Country Club Estates', url: 'https://www.miamisprings-fl.gov/community/page/lua-curtiss-house-2', note: 'City historic site record citing the original 1926 Country Club Estates promotional brochure' },
    ],
  },
  {
    key: 'historic_sites',
    links: [
      { label: 'Curtiss Mansion', url: 'https://curtissmansion.com/', note: 'Glenn H. Curtiss Mansion and Gardens, Miami Springs' },
      { label: 'Curtiss Mansion — Community History', url: 'https://curtissmansion.com/community-history/', note: 'History of Miami Springs and the Curtiss-Bright development' },
      { label: 'Curtiss Mansion — National Register of Historic Places', url: 'https://npgallery.nps.gov/AssetDetail/NRIS/85003579', note: 'NPS NRHP record no. 85003579, listed December 21, 2001' },
      { label: 'Glenn Curtiss House — National Park Service', url: 'https://www.nps.gov/articles/glenn-curtiss-house.htm', note: 'NPS article on the Curtiss House and its history' },
      { label: 'Glenn H. Curtiss Mansion and Gardens — City of Miami Springs', url: 'https://www.miamisprings-fl.gov/community/page/glenn-h-curtiss-mansion-and-gardens', note: 'City record confirming National Register listing (2001) and local historic designation (1987)' },
      { label: 'Preserve America — Miami Springs, Florida', url: 'https://www.achp.gov/preserve-america/community/miami-springs-florida', note: 'Advisory Council on Historic Preservation community profile' },
    ],
  },
  {
    key: 'archives',
    links: [
      { label: 'Florida Memory — State Archives of Florida', url: 'https://www.floridamemory.com/', note: 'Public domain photographs and documents' },
      { label: 'Florida Memory — Lua Curtiss House #1, Country Club Estates (1926)', url: 'https://www.floridamemory.com/items/show/165577', note: 'Fishbaugh photograph, June 7, 1926. Record PHF278. Public domain.' },
      { label: 'Florida Memory — Glenn H. Curtiss Home (1927)', url: 'https://www.floridamemory.com/items/show/165447', note: 'Fishbaugh photograph. Public domain.' },
      { label: 'Florida Memory — Two Homes in Country Club Estates (1926)', url: 'https://www.floridamemory.com/items/show/165582', note: 'Fishbaugh photograph. Public domain.' },
      { label: 'The Miami News — "Four Months of Development, Country Club Estates" (April 9, 1925)', url: 'https://www.newspapers.com/article/the-miami-news-1925-apr-9-miami-news-p-1/38514743/', note: 'Newspapers.com (subscription required). Promotional coverage of early Country Club Estates development.' },
      { label: 'Glenn H. Curtiss Collection — Smithsonian NASM', url: 'https://airandspace.si.edu/collection-archive/glenn-h-curtiss-collection/sova-nasm-xxxx-0053', note: 'Personal and corporate correspondence, photographs, and legal records (1905–1931)' },
      { label: 'Glenn H. Curtiss Museum, Hammondsport NY', url: 'https://glennhcurtissmuseum.org/', note: "Personal letters, blueprints, and corporate documents held in Curtiss's hometown" },
      { label: 'Hialeah History Digital Collection', url: 'https://hialeahpubliclibraries.contentdm.oclc.org/', note: 'Holds a 1926 Curtiss-Bright letter to property owners, early aerial photographs, and Curtiss-Bright Ranch images (ca. 1922)' },
      { label: 'Library of Congress — Glenn Curtiss Photographs', url: 'https://www.loc.gov/photos/?q=glenn+curtiss', note: 'Public domain photographs including the Harris & Ewing portrait collection' },
    ],
  },
  {
    key: 'people',
    links: [
      { label: 'Wikipedia — Glenn Hammond Curtiss', url: 'https://en.wikipedia.org/wiki/Glenn_Curtiss', note: 'Aviation pioneer, inventor, and co-founder of Miami Springs' },
      { label: 'Wikipedia — Glenn Curtiss Mansion', url: 'https://en.wikipedia.org/wiki/Glenn_Curtiss_Mansion', note: '' },
      { label: 'James H. Bright Elementary — Biographies', url: 'https://jameshbrightelementary.net/biographies/', note: 'Biographical notes on James H. Bright, co-developer of Country Club Estates' },
      { label: 'Miami Springs Golf Course History — Yvonne Shonberger', url: 'http://miamispringsgolfcourse.com/history/', note: 'Researched history of the Miami Springs Golf & Country Club by a Miami Springs Preservation Board member, drawing on primary sources and news accounts' },
    ],
  },
  {
    key: 'architecture',
    links: [
      { label: 'Wikipedia — Pueblo Revival Architecture', url: 'https://en.wikipedia.org/wiki/Pueblo_Revival_architecture', note: '' },
      { label: 'Bound By Beauty — Before Miami Shores: Pine Rocklands and Wet Prairies', url: 'https://boundbybeauty.org/before-miami-shores-pine-rocklands-and-wet-prairielands/', note: 'Ecological history of the pre-development northwest Miami-Dade landscape' },
    ],
  },
  {
    key: 'aviation',
    links: [
      { label: 'Wikipedia — Eastern Air Lines', url: 'https://en.wikipedia.org/wiki/Eastern_Air_Lines', note: '' },
      { label: 'MiamiSprings.com — Why So Many Eastern Airlines Employees Lived in Miami Springs', url: 'https://new.miamisprings.com/why-so-many-eastern-airlines-employees-lived-in-miami-springs/', note: 'Documents the Glenn H. Curtiss Properties financing offers to Eastern employees in 1935' },
      { label: 'Hangar 5 Foundation', url: 'https://hangar5foundation.org/', note: 'Preservation of aviation history at the former 36th Street Airport site' },
      { label: 'Flashback Miami — Hialeah', url: 'https://flashbackmiami.com/2015/08/06/hialeah/', note: 'Historical overview of the Curtiss-Bright land development era in northwest Miami-Dade' },
      { label: 'Smithsonian Air & Space — The Unrecognized First (Emory Conrad Malick)', url: 'https://www.smithsonianmag.com/air-space-magazine/the-unrecognized-first-79496373/', note: 'Documents the disputed claim that Malick was the first African American aviator; genealogical evidence showed he was white — retracted by Smithsonian and NMAAHC in 2023' },
      { label: 'MiamiSprings.com — Father of Cuban Aviation, Agustín Parlá', url: 'https://new.miamisprings.com/father-of-cuban-aviation-augustin-parla-learned-to-fly-at-the-glenn-curtiss-school-of-aviation-in-miami/', note: "Documents Parlá's training at the Curtiss School of Aviation in Miami, January 1912" },
      { label: 'Glenn Curtiss Aviation Museum — Teaching the World to Fly', url: 'https://glennhcurtissmuseum.org/education/teaching-the-world-to-fly/', note: "Overview of Curtiss's international flight school students including Kondo, Singh, and Parlá" },
      { label: 'Wikipedia — Curtiss Flying School', url: 'https://en.wikipedia.org/wiki/Curtiss_Flying_School', note: 'History of the Curtiss aviation schools and their international students' },
      { label: 'Internet Archive — Aeronautics Magazine, 1912 (Vol. 11–12)', url: 'https://archive.org/details/aeronautics1112aero', note: 'June and July 1912 issues feature Rafael Martí and Agustín Parlá as Curtiss school students' },
    ],
  },
  {
    key: 'hotel_sanitarium',
    links: [
      { label: 'City of Miami Springs — Hotel Country Club (Fairhavens)', url: 'https://www.miamisprings-fl.gov/community/page/hotel-country-club-fairhavens', note: 'City historic site record: built 1926 by Glenn Curtiss, transferred to Dr. John Harvey Kellogg in 1929, operated as Miami Battle Creek Sanitarium' },
      { label: 'City of Miami Springs — Fair Havens Historically Designated and Protected', url: 'https://www.miamisprings-fl.gov/community/page/fair-havens-historically-designated-and-protected', note: 'City record of the 1984 local historic designation and 1986 National Register of Historic Places listing (ref. 86003876)' },
      { label: 'University of Miami Libraries — Kellogg Southern Sanitarium (1928)', url: 'https://digitalcollections.library.miami.edu/digital/collection/asm0157/id/414/', note: 'Jesse S. Wooley photograph, 1928. Floyd and Marion Rinhart Photograph Collection, ASM0157. Public domain.' },
      { label: 'Miami Springs Nursing and Rehabilitation Center', url: 'https://miamispringsrehab.com/', note: 'Current operator of the historic 201 Curtiss Parkway building' },
    ],
  },
  {
    key: 'reading',
    links: [
      { label: 'WLRN — The untold story of the pioneering aviator who founded Miami Springs', url: 'https://www.wlrn.org/century/2025-12-23/glenn-curtiss-aviator-miami-springs-florida', note: 'WLRN, December 2025' },
      { label: 'ArcGIS StoryMap — The History of Agriculture in Miami-Dade County', url: 'https://storymaps.arcgis.com/stories/89a9488170a549119994c8c034cd9f12', note: 'Context on land use and agricultural history in Miami-Dade County' },
      { label: 'Wikipedia — Miami Springs, Florida', url: 'https://en.wikipedia.org/wiki/Miami_Springs,_Florida', note: '' },
    ],
  },
];
