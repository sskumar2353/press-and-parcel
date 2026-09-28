import React, { useEffect, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import {
  ArrowRight, ArrowUpRight, Check, ChevronDown, ChevronRight, ClipboardList,
  Factory, Menu, Package, Palette, Phone, Printer, Search, Send, ShieldCheck,
  ShoppingBag, Sparkles, Tag, Users, X
} from "lucide-react";

const productGroups = [
  {
    id: "paper",
    title: "Paper & Commercial Digital Printing",
    icon: Printer,
    description: "Professional stationery, marketing collateral and everyday business print.",
    products: ["Business Cards","Visiting Cards","Letterheads","Envelopes","Flyers","Leaflets","Brochures","Catalogs","Booklets","Posters","Certificates","Company Folders","Presentation Folders","Notepads","Diaries","Calendars","Menu Cards","Price Lists","Product Sheets","Promotional Cards","Coupon Cards","Door Hangers","Tent Cards"]
  },
  {
    id: "documents",
    title: "Book & Continuous Document Printing",
    icon: ClipboardList,
    description: "Numbered and bound business documents for recurring operations.",
    products: ["Invoice Books","Receipt Books","Quotation Books"]
  },
  {
    id: "stamps",
    title: "Rubber Stamp Production",
    icon: ShieldCheck,
    description: "Office, company and administrative stamps in multiple formats.",
    products: ["Rubber Stamps","Self Inking Stamps","Pre Inked Stamps","Date Stamps","Number Stamps","Signature Stamps"]
  },
  {
    id: "apparel",
    title: "Apparel Printing",
    icon: ShoppingBag,
    description: "Branded apparel for teams, businesses, institutions and campaigns.",
    products: ["T-Shirts","Hoodies","Sweatshirts","Polo T-Shirts","Jerseys","Aprons"]
  },
  {
    id: "fabric",
    title: "Fabric & Textile Products",
    icon: Package,
    description: "Custom fabric merchandise and reusable textile products.",
    products: ["Tote Bags","Drawstring Bags","Fabric Pouches","Cloth Bags","Pillow Covers"]
  },
  {
    id: "caps",
    title: "Cap Customization",
    icon: Sparkles,
    description: "Branded headwear using patches and direct customization.",
    products: ["Embroidery Patches","Direct Cap Printing"]
  },
  {
    id: "large-format",
    title: "Large Format Flexible Printing",
    icon: Factory,
    description: "High-impact flexible displays for advertising, events and promotions.",
    products: ["Banners","Flex Boards","Event Banners","Flex Advertising Prints","Fabric Banners","PVC Banners"]
  },
  {
    id: "rigid",
    title: "Rigid Board Printing",
    icon: Palette,
    description: "Mounted displays and rigid presentation materials.",
    products: ["Foam-Board Signs","Advertising Boards","Standee Prints","A-Frames","Table Top Displays","Notice Boards"]
  },
  {
    id: "stickers",
    title: "Sticker & Label Printing",
    icon: Tag,
    description: "Product, packaging and promotional labels in practical finishes.",
    products: ["Product Labels","Packaging Stickers","Logo Stickers","Thank-you Stickers","Bottle Labels","Jar Labels","Food Labels","Waterproof Labels","Security Stickers"]
  },
  {
    id: "tags",
    title: "Product Tag & Hang Tag Printing",
    icon: Tag,
    description: "Retail and product identification tags for branded goods.",
    products: ["Product Tags","Hang Tags","Clothing Tags","Price Tags","Jewellery Tags","Retail Tags"]
  },
  {
    id: "packaging",
    title: "Packing Paper Products",
    icon: Package,
    description: "Printed packaging for retail, food, gifts and e-commerce brands.",
    products: ["Paper Bags","Packing Sleeves","Product Boxes","Gift Boxes","Food Boxes","Cosmetic Boxes","Retail Boxes","Shipping Boxes"]
  },
  {
    id: "events",
    title: "Event Display Materials",
    icon: Sparkles,
    description: "Event-ready displays and guest materials for memorable occasions.",
    products: ["Welcome Boards","Seating Charts","Table Numbers","Event Backdrops","Stage Banners","Event Badges","Wristbands"]
  },
  {
    id: "photo",
    title: "Photo Printing & Framing",
    icon: Palette,
    description: "Photo prints and finished photo displays for personal and commercial use.",
    products: ["Photo Frames","Photo Prints"]
  },
  {
    id: "personalized",
    title: "Personalised Hard Surface & Writing Products",
    icon: Sparkles,
    description: "Custom gifts and branded everyday products made for people and businesses.",
    products: ["Personalised Mugs","Personalised Cushions","Personalized Keychains","Personalised Plates","Personalised Bottles","Personalised Sippers","Personalised Photo Gifts","Personalised Pens","Personalised Notebooks","Personalised Diaries","Personalised Memo Pads","Personalised Writing Pads"]
  }
];


const productMeta = {
  "Business Cards": { description: "Professional first-impression cards for employees, founders, sales teams and customer-facing staff.", uses: ["Corporate identity", "Sales teams", "Networking"], finish: "Digital print • Premium cardstock • Matte / gloss finishes" },
  "Visiting Cards": { description: "Personal contact cards for professionals, consultants and local businesses.", uses: ["Professional services", "Appointments", "Networking"], finish: "Cardstock • Single / double side • Optional lamination" },
  "Letterheads": { description: "Branded documents that keep every official communication consistent.", uses: ["Business correspondence", "Institutions", "Invoices & notices"], finish: "A4 / A5 • Premium paper • Colour or mono" },
  "Envelopes": { description: "Branded envelopes for formal correspondence, invoices, certificates and customer communication.", uses: ["Corporate mail", "Institutions", "Invitations"], finish: "Printed flap • Multiple sizes • Custom stock" },
  "Flyers": { description: "Fast, economical promotional sheets for local campaigns and offers.", uses: ["Retail promotions", "Events", "Service businesses"], finish: "Single / double side • Multiple sizes" },
  "Leaflets": { description: "Compact promotional handouts for high-volume distribution.", uses: ["Door-to-door", "Local campaigns", "Product awareness"], finish: "Lightweight paper • Bulk production" },
  "Brochures": { description: "Structured marketing collateral that explains a business, service or product.", uses: ["Corporate profiles", "Real estate", "Hospitality"], finish: "Folded formats • Premium paper" },
  "Catalogs": { description: "Multi-product marketing books designed to present collections and ranges clearly.", uses: ["Retail", "Manufacturing", "D2C brands"], finish: "Multi-page • Saddle / perfect binding" },
  "Booklets": { description: "Compact multi-page publications for information, programs and promotional content.", uses: ["Churches", "Schools", "Events"], finish: "Folded / bound • Custom page count" },
  "Posters": { description: "High-visibility promotional and informational graphics for walls and displays.", uses: ["Offers", "Events", "Awareness campaigns"], finish: "A4 to large formats • Matte / gloss" },
  "Certificates": { description: "Formal recognition documents for institutions, events, training and achievements.", uses: ["Schools", "Churches", "Corporate awards"], finish: "Premium cardstock • Optional lamination" },
  "Company Folders": { description: "Branded presentation folders for documents, proposals and sales material.", uses: ["Corporate", "Real estate", "Consulting"], finish: "Die-cut pockets • Premium cardstock" },
  "Presentation Folders": { description: "Client-facing folders that organize brochures, proposals and supporting documents.", uses: ["Sales meetings", "Proposals", "Conferences"], finish: "Custom pockets • Printed cover" },
  "Notepads": { description: "Branded writing pads for offices, teams, meetings and customer giveaways.", uses: ["Meetings", "Training", "Corporate gifts"], finish: "Glued pads • Multiple sheet counts" },
  "Diaries": { description: "Branded yearly diaries for teams, customers and corporate gifting.", uses: ["Employee gifts", "Customer gifts", "Institutions"], finish: "Hard / soft cover • Custom branding" },
  "Calendars": { description: "Wall, desk or promotional calendars carrying your brand throughout the year.", uses: ["Corporate gifting", "Retail", "Organizations"], finish: "Wall / desk formats • Custom pages" },
  "Menu Cards": { description: "Customer-facing menus designed around readability, brand identity and frequent updates.", uses: ["Restaurants", "Cafes", "Hotels"], finish: "Laminated / premium stock" },
  "Price Lists": { description: "Clear product or service price communication for counters, sales teams and customers.", uses: ["Retail", "Restaurants", "Service businesses"], finish: "Single / multi-page • Easy-to-update formats" },
  "Product Sheets": { description: "Focused product information sheets for sales, retail and B2B communication.", uses: ["Manufacturing", "Electronics", "Real estate"], finish: "A4 / A3 • Single / double side" },
  "Promotional Cards": { description: "Compact branded cards for offers, announcements, referrals and campaigns.", uses: ["Retail", "Restaurants", "Events"], finish: "Cardstock • Optional rounded corners" },
  "Coupon Cards": { description: "Printed offer cards that encourage repeat visits and customer action.", uses: ["Retail", "Restaurants", "Salons"], finish: "Cardstock • Numbering / codes optional" },
  "Door Hangers": { description: "Hanging promotional or informational pieces designed for doors and handles.", uses: ["Hotels", "Real estate", "Service businesses"], finish: "Die-cut • Heavy cardstock" },
  "Tent Cards": { description: "Small folded counter or table displays for offers, QR codes and announcements.", uses: ["Restaurants", "Hotels", "Events"], finish: "Folded cardstock • Tabletop format" },
  "Invoice Books": { description: "Branded duplicate or triplicate books for invoicing and record keeping.", uses: ["Retail", "Offices", "Small businesses"], finish: "Numbered • NCR / carbonless options" },
  "Receipt Books": { description: "Sequential receipt books for payments, donations and everyday transactions.", uses: ["Churches", "Retail", "Organizations"], finish: "Numbered • Duplicate / triplicate" },
  "Quotation Books": { description: "Professional quotation books for sales teams and service businesses.", uses: ["Contractors", "Consultants", "Small businesses"], finish: "Numbered • Multi-copy options" },
  "Rubber Stamps": { description: "General-purpose custom stamps for company and administrative use.", uses: ["Offices", "Institutions", "Retail"], finish: "Custom plate • Multiple sizes" },
  "Self Inking Stamps": { description: "Convenient reusable stamps with integrated ink for fast daily use.", uses: ["Offices", "Banks", "Schools"], finish: "Self-contained ink mechanism" },
  "Pre Inked Stamps": { description: "Compact stamps designed for crisp impressions with built-in ink.", uses: ["Signatures", "Approvals", "Administrative work"], finish: "Fine detail • Compact body" },
  "Date Stamps": { description: "Adjustable date stamps for document processing and records.", uses: ["Offices", "Banks", "Warehouses"], finish: "Adjustable date bands" },
  "Number Stamps": { description: "Sequential or fixed number stamps for tracking and documentation.", uses: ["Invoices", "Inventory", "Records"], finish: "Number bands • Custom configurations" },
  "Signature Stamps": { description: "Custom signature reproduction stamps for authorized workflows.", uses: ["Office approvals", "Administrative processes", "Routine documents"], finish: "Custom stamp plate" },
  "T-Shirts": { description: "Custom printed tees for teams, campaigns, events, brands and merchandise.", uses: ["Company teams", "Events", "Merchandise"], finish: "DTF / screen / suitable transfer methods" },
  "Hoodies": { description: "Premium branded hoodies for teams, communities and merchandise drops.", uses: ["IT teams", "Colleges", "Brands"], finish: "Front / back / sleeve branding" },
  "Sweatshirts": { description: "Comfortable branded sweatshirts for teams and promotional use.", uses: ["Institutions", "Clubs", "Corporate teams"], finish: "Custom chest / back print" },
  "Polo T-Shirts": { description: "Smart branded polos suited to staff uniforms and corporate teams.", uses: ["Hospitality", "Corporate", "Retail"], finish: "Chest logo • Sleeve / back options" },
  "Jerseys": { description: "Custom sports jerseys with names, numbers and team identity.", uses: ["Colleges", "Gyms", "Sports teams"], finish: "Name / number / sponsor branding" },
  "Aprons": { description: "Branded work aprons for food, hospitality, salons and craft businesses.", uses: ["Restaurants", "Bakeries", "Salons"], finish: "Logo print / patch options" },
  "Tote Bags": { description: "Reusable branded fabric bags for retail, events and promotional campaigns.", uses: ["Retail", "Events", "Corporate gifts"], finish: "Fabric print / transfer" },
  "Drawstring Bags": { description: "Lightweight branded bags for events, sports and promotional kits.", uses: ["Events", "Gyms", "Schools"], finish: "Fabric print / transfer" },
  "Fabric Pouches": { description: "Compact custom pouches for gifting, products and promotional kits.", uses: ["Gift brands", "Events", "D2C"], finish: "Fabric print / transfer" },
  "Cloth Bags": { description: "Reusable cloth bags for sustainable retail and promotional branding.", uses: ["Retail", "Grocery", "Events"], finish: "Fabric print / transfer" },
  "Pillow Covers": { description: "Personalised textile covers for gifts, decor and event merchandise.", uses: ["Gifts", "Events", "Home decor"], finish: "Sublimation / suitable textile transfer" },
  "Embroidery Patches": { description: "Branded patches that can be applied to caps, uniforms and apparel.", uses: ["Teams", "Uniforms", "Merchandise"], finish: "Embroidered patch with backing" },
  "Direct Cap Printing": { description: "Custom cap decoration for teams, brands and promotional campaigns.", uses: ["Events", "Brands", "Clubs"], finish: "Direct print / transfer" },
  "Banners": { description: "Large visual communication for events, storefronts and promotions.", uses: ["Events", "Retail", "Campaigns"], finish: "Large-format flexible print" },
  "Flex Boards": { description: "Flexible outdoor advertising graphics for high-visibility placements.", uses: ["Retail", "Real estate", "Events"], finish: "Flex media • Eyelets / finishing" },
  "Event Banners": { description: "Event-specific banners for entrances, stages, announcements and branding.", uses: ["Weddings", "Conferences", "Church events"], finish: "Flexible print • Custom sizes" },
  "Flex Advertising Prints": { description: "Cost-effective large promotional prints for repeated campaigns.", uses: ["Retail", "Real estate", "Local advertising"], finish: "Outdoor flex media" },
  "Fabric Banners": { description: "Lightweight textile banners with a premium event presentation.", uses: ["Events", "Conferences", "Exhibitions"], finish: "Fabric print • Hemming options" },
  "PVC Banners": { description: "Durable flexible PVC graphics for indoor and outdoor applications.", uses: ["Retail", "Construction", "Events"], finish: "PVC media • Finishing options" },
  "Foam-Board Signs": { description: "Lightweight rigid signs for indoor displays and short-term promotions.", uses: ["Offices", "Events", "Retail"], finish: "Foam board mounting" },
  "Advertising Boards": { description: "Rigid promotional boards for storefronts, campaigns and displays.", uses: ["Retail", "Real estate", "Events"], finish: "Rigid substrate • Custom cut" },
  "Standee Prints": { description: "Freestanding promotional graphics that attract attention at entrances and events.", uses: ["Retail", "Conferences", "Events"], finish: "Printed board / stand system" },
  "A-Frames": { description: "Portable two-sided display boards for sidewalks, entrances and events.", uses: ["Restaurants", "Retail", "Banquets"], finish: "Rigid panels • Folding frame" },
  "Table Top Displays": { description: "Compact countertop branding for offers, QR codes and product information.", uses: ["Restaurants", "Hotels", "Retail"], finish: "Rigid/card display formats" },
  "Notice Boards": { description: "Information display boards for offices, schools, institutions and facilities.", uses: ["Schools", "Offices", "Churches"], finish: "Rigid board / display surface" },
  "Product Labels": { description: "Brand and product information labels for packaged goods.", uses: ["D2C", "Manufacturing", "Retail"], finish: "Paper / synthetic / waterproof options" },
  "Packaging Stickers": { description: "Branded adhesive stickers that complete the look of shipped or retail packaging.", uses: ["D2C", "Food", "Gift shops"], finish: "Paper / vinyl / waterproof options" },
  "Logo Stickers": { description: "Simple brand marks for packaging, products, laptops and promotional use.", uses: ["Startups", "Brands", "Events"], finish: "Die-cut / kiss-cut options" },
  "Thank-you Stickers": { description: "Small packaging stickers that add a branded customer experience.", uses: ["E-commerce", "Gift shops", "Bakeries"], finish: "Adhesive label stock" },
  "Bottle Labels": { description: "Custom labels for water, beverage, cosmetic and other bottles.", uses: ["Bakeries", "Events", "D2C brands"], finish: "Water-resistant options" },
  "Jar Labels": { description: "Product labels for jars, candles, food, cosmetics and handmade products.", uses: ["D2C", "Food", "Gift brands"], finish: "Custom shapes • Waterproof options" },
  "Food Labels": { description: "Food packaging labels for product identity and customer information.", uses: ["Bakeries", "Restaurants", "Food brands"], finish: "Food-suitable material options" },
  "Waterproof Labels": { description: "Durable labels designed for moisture-prone products and environments.", uses: ["Bottles", "Outdoor products", "Food packaging"], finish: "Synthetic / vinyl media" },
  "Security Stickers": { description: "Tamper-evident and controlled-use stickers for packaging and asset protection.", uses: ["Retail", "Manufacturing", "Logistics"], finish: "Security / destructible options" },
  "Product Tags": { description: "Printed tags that communicate product, price and brand information.", uses: ["Retail", "Clothing", "Gift shops"], finish: "Cardstock • Hole punch options" },
  "Hang Tags": { description: "Branded hanging tags for products, apparel and retail presentation.", uses: ["Clothing", "Accessories", "Gift shops"], finish: "Die-cut cardstock • String options" },
  "Clothing Tags": { description: "Brand and care-related tags for apparel and textile products.", uses: ["Fashion", "Uniforms", "Boutiques"], finish: "Printed card / fabric tag options" },
  "Price Tags": { description: "Simple product pricing tags for stores and retail displays.", uses: ["Retail", "Gift shops", "Clothing"], finish: "Card / adhesive formats" },
  "Jewellery Tags": { description: "Small premium tags designed for jewellery and accessories.", uses: ["Jewellery", "Boutiques", "Gift shops"], finish: "Small-format premium stock" },
  "Retail Tags": { description: "General-purpose branded tags for products displayed in stores.", uses: ["Retail", "Supermarkets", "Gift shops"], finish: "Custom size and die cut" },
  "Paper Bags": { description: "Branded carry bags for shops, restaurants, events and gifts.", uses: ["Retail", "Restaurants", "Gift shops"], finish: "Paper stock • Handles / custom print" },
  "Packing Sleeves": { description: "Printed sleeves that add brand presentation around boxes and products.", uses: ["D2C", "Food", "Cosmetics"], finish: "Folded / glued paper sleeve" },
  "Product Boxes": { description: "Custom printed boxes for products, retail presentation and shipping.", uses: ["D2C", "Retail", "Manufacturing"], finish: "Die-cut • Creased • Folded" },
  "Gift Boxes": { description: "Branded gift packaging for premium presentation and celebrations.", uses: ["Gifts", "Corporate", "Events"], finish: "Premium board • Custom finishing" },
  "Food Boxes": { description: "Printed boxes for takeaway, bakery and food presentation.", uses: ["Restaurants", "Bakeries", "Food brands"], finish: "Food-packaging material options" },
  "Cosmetic Boxes": { description: "Retail-ready boxes for beauty and personal-care products.", uses: ["Cosmetics", "Salons", "D2C"], finish: "Premium printed board" },
  "Retail Boxes": { description: "Branded packaging designed for shelf presentation and customer experience.", uses: ["Retail", "Electronics", "Gift shops"], finish: "Printed board • Custom dielines" },
  "Shipping Boxes": { description: "Branded outer packaging for e-commerce and product dispatch.", uses: ["E-commerce", "D2C", "Retail"], finish: "Corrugated / printed options" },
  "Welcome Boards": { description: "Entrance display boards that introduce guests to an event or venue.", uses: ["Weddings", "Banquets", "Conferences"], finish: "Rigid board / mounted print" },
  "Seating Charts": { description: "Organised guest seating displays for weddings, banquets and conferences.", uses: ["Weddings", "Banquets", "Events"], finish: "Mounted print / display board" },
  "Table Numbers": { description: "Clear table identification displays for guests and service teams.", uses: ["Weddings", "Banquets", "Hotels"], finish: "Card / acrylic / rigid display" },
  "Event Backdrops": { description: "Large branded backgrounds for stages, photographs and event areas.", uses: ["Weddings", "Corporate events", "Conferences"], finish: "Fabric / flex / rigid options" },
  "Stage Banners": { description: "Large-format stage branding for ceremonies, conferences and performances.", uses: ["Events", "Churches", "Colleges"], finish: "Large-format print" },
  "Event Badges": { description: "Branded attendee badges for identification and event organisation.", uses: ["Conferences", "Corporate events", "Schools"], finish: "Card/PVC options • Holder/lanyard compatible" },
  "Wristbands": { description: "Event identification bands for access control and guest grouping.", uses: ["Concerts", "Events", "Banquets"], finish: "Paper / synthetic event bands" },
  "Photo Frames": { description: "Printed photographs finished inside decorative or branded frames.", uses: ["Gifts", "Events", "Home decor"], finish: "Photo print + frame assembly" },
  "Photo Prints": { description: "High-quality photographic prints in standard and custom sizes.", uses: ["Events", "Gifts", "Personal use"], finish: "Photo paper • Multiple sizes" },
  "Personalised Mugs": { description: "Custom mugs with names, photos, logos or artwork.", uses: ["Gifts", "Corporate", "Events"], finish: "Sublimation / suitable hard-surface print" },
  "Personalised Cushions": { description: "Photo and artwork cushions for gifts, celebrations and merchandise.", uses: ["Gifts", "Events", "Home decor"], finish: "Textile transfer / sublimation" },
  "Personalized Keychains": { description: "Small custom gifts or branded giveaways with names, logos or images.", uses: ["Corporate gifts", "Events", "Retail"], finish: "Acrylic / metal / sublimation options" },
  "Personalised Plates": { description: "Decorative personalised plates for gifts, events and display.", uses: ["Gifts", "Events", "Home decor"], finish: "Sublimation / suitable surface print" },
  "Personalised Bottles": { description: "Custom branded bottles for employees, teams, events and gifts.", uses: ["Corporate", "Gyms", "Events"], finish: "UV / transfer / engraving options" },
  "Personalised Sippers": { description: "Custom sippers for teams, schools, gyms and promotional campaigns.", uses: ["Gyms", "Schools", "Corporate"], finish: "Suitable hard-surface customization" },
  "Personalised Photo Gifts": { description: "Photo-led keepsakes that turn personal images into branded gifts.", uses: ["Birthdays", "Weddings", "Anniversaries"], finish: "Product-specific photo customization" },
  "Personalised Pens": { description: "Branded pens for corporate giveaways, events and everyday promotion.", uses: ["Corporate", "Events", "Schools"], finish: "Pad/UV/laser branding depending on pen" },
  "Personalised Notebooks": { description: "Custom notebooks for teams, students, events and gifting.", uses: ["Corporate", "Schools", "Events"], finish: "Cover branding • Multiple binding styles" },
  "Personalised Diaries": { description: "Branded diaries combining practical use with long-term brand visibility.", uses: ["Corporate gifts", "Institutions", "Events"], finish: "Cover customization" },
  "Personalised Memo Pads": { description: "Small custom memo pads for desks, gifts and promotional kits.", uses: ["Corporate", "Events", "Retail"], finish: "Printed cover / custom sheets" },
  "Personalised Writing Pads": { description: "Branded writing pads for meetings, classes and customer kits.", uses: ["Corporate", "Schools", "Conferences"], finish: "Custom cover / sheet count" }
};

const getProductMeta = (product, groupTitle) => productMeta[product] || {
  description: `Custom ${product.toLowerCase()} produced for ${groupTitle.toLowerCase()} requirements.`,
  uses: ["Business branding", "Events", "Promotional use"],
  finish: "Custom size • Material • Finish based on requirement"
};

const industries = {
  Business: ["Corporate","IT Companies","Startups","Offices","Banks","Insurance","Real Estate","Manufacturing"],
  Institutions: ["Churches","Schools","Colleges","Hospitals"],
  Events: ["Weddings","Engagements","Birthdays","Corporate Events","Conferences","Banquets"],
  Hospitality: ["Restaurants","Cafes","Bakeries","Hotels","Banquet Halls"],
  Retail: ["Clothing","Electronics","Supermarkets","Pharmacies","Gift Shops"],
  Services: ["Salons","Gyms","Clinics","Dentists","Consultants","Professional"]
};

const industryUseCases = {
  Corporate: ["Business stationery","Employee ID cards","Office signage","Corporate merchandise","Event collateral"],
  "IT Companies": ["Team T-shirts","Employee kits","Office signs","ID cards & lanyards","Corporate gifts"],
  Startups: ["Launch stationery","Packaging","Product labels","Promotional kits","Branded merchandise"],
  Offices: ["Letterheads","Envelopes","Stamps","Folders","Certificates"],
  Banks: ["Branch signage","Promotional displays","Employee cards","Forms & stationery","Corporate gifts"],
  Insurance: ["Brochures","Product sheets","Promotional cards","ID cards","Event materials"],
  "Real Estate": ["Property brochures","Site boards","Flyers","Standee prints","Direction signage"],
  Manufacturing: ["Product labels","Safety signage","Packaging","Employee IDs","Corporate stationery"],
  Churches: ["Event banners","Certificates","Invitation cards","Ministry T-shirts","Direction signage"],
  Schools: ["ID cards","Certificates","Badges","Event banners","Notebooks"],
  Colleges: ["Jerseys","Hoodies","Event badges","Posters","Certificates"],
  Hospitals: ["Wayfinding signs","Room signs","ID cards","Brochures","Certificates"],
  Weddings: ["Invitations","Welcome boards","Seating charts","Table numbers","Backdrops"],
  Engagements: ["Invitations","Welcome boards","Name cards","Backdrops","Photo prints"],
  Birthdays: ["Invitations","Backdrops","Welcome boards","Table displays","Personalised gifts"],
  "Corporate Events": ["Badges","Wristbands","Backdrops","Stage banners","Certificates"],
  Conferences: ["Badges","Wristbands","Backdrop graphics","Directional signs","Brochures"],
  Banquets: ["Welcome boards","Table numbers","Menu cards","Seating charts","Backdrops"],
  Restaurants: ["Menu cards","Packaging stickers","Paper bags","Aprons","Shop signage"],
  Cafes: ["Menus","Cup/bottle labels","Packaging","Table-top displays","Staff apparel"],
  Bakeries: ["Food labels","Product boxes","Thank-you stickers","Paper bags","Product tags"],
  Hotels: ["Room signs","Menus","Event displays","Guest materials","Staff branding"],
  "Banquet Halls": ["Welcome boards","Direction signs","Stage banners","Table numbers","Event signage"],
  Clothing: ["Hang tags","Product labels","Paper bags","T-shirts","Promotional cards"],
  Electronics: ["Product sheets","Price lists","Packaging labels","Shop boards","Promotional flyers"],
  Supermarkets: ["Price cards","Shelf/packaging labels","Promotional flyers","Banners","Coupon cards"],
  Pharmacies: ["Product labels","Price lists","Shop signage","Promotional posters","Bags"],
  "Gift Shops": ["Product tags","Gift boxes","Paper bags","Stickers","Personalised gifts"],
  Salons: ["Price lists","Coupon cards","Shop signage","Staff apparel","Business cards"],
  Gyms: ["T-shirts","Hoodies","Bottles","Membership cards","Posters"],
  Clinics: ["Business cards","Letterheads","Door plates","Brochures","Certificates"],
  Dentists: ["Business cards","Appointment materials","Room signs","Brochures","Branded gifts"],
  Consultants: ["Business cards","Letterheads","Presentation folders","Notepads","Corporate gifts"],
  Professional: ["Business cards","Letterheads","Envelopes","Stamps","Office signage"]
};


function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, search]);
  return null;
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <img src="/press-and-parcel-logo.png" alt="Press & Parcel logo" />
          <div>
            <strong>Press & Parcel</strong>
            <span>Brand. Print. Deliver.</span>
          </div>
        </Link>
        <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
          {open ? <X size={23}/> : <Menu size={23}/>}
        </button>
        <nav className={open ? "main-nav open" : "main-nav"}>
          <NavLink to="/" end onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/products" onClick={() => setOpen(false)}>Products</NavLink>
          <NavLink to="/industries" onClick={() => setOpen(false)}>Industries</NavLink>
          <NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink>
          <NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink>
          <Link className="nav-cta" to="/quote" onClick={() => setOpen(false)}>Get a Quote <ArrowUpRight size={17}/></Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link to="/" className="brand footer-brand">
            <img src="/press-and-parcel-logo.png" alt="" />
            <div><strong>Press & Parcel</strong><span>Print. Brand. Deliver.</span></div>
          </Link>
          <p>One partner for printing, branding, packaging, merchandise and event materials.</p>
        </div>
        <div>
          <h4>Explore</h4>
          <Link to="/products">Products</Link>
          <Link to="/industries">Industries</Link>
          <Link to="/about">About us</Link>
        </div>
        <div>
          <h4>Services</h4>
          <span>Print</span><span>Brand</span><span>Package</span><span>Promote</span>
        </div>
        <div>
          <h4>Start a project</h4>
          <p>Tell us what you need and we’ll prepare a quote around your quantity, material and finish.</p>
          <Link className="text-link" to="/quote">Request a quote <ArrowRight size={15}/></Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Press & Parcel. All rights reserved.</span>
        <span>Print • Brand • Package • Promote</span>
      </div>
    </footer>
  );
}

function Home() {
  const [search, setSearch] = useState("");
  const filtered = productGroups.filter(g =>
    g.title.toLowerCase().includes(search.toLowerCase()) ||
    g.products.some(p => p.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      <section className="hero">
        <div className="hero-shape one"></div>
        <div className="hero-shape two"></div>
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span></span> PRINT • BRAND • PACKAGE • PROMOTE</div>
            <h1>Everything your brand needs, <em>under one roof.</em></h1>
            <p className="hero-text">From business cards and packaging to apparel, signage and event displays — Press & Parcel brings your physical brand to life.</p>
            <div className="hero-actions">
              <Link className="button primary" to="/quote">Start a Project <ArrowRight size={18}/></Link>
              <Link className="button ghost" to="/products">Explore Products</Link>
            </div>
            <div className="trust-row">
              <div><strong>14</strong><span>Product groups</span></div>
              <div><strong>60+</strong><span>Product options</span></div>
              <div><strong>6</strong><span>Industry segments</span></div>
            </div>
          </div>
          <div className="hero-card">
            <div className="hero-card-top"><span>PRESS & PARCEL</span><span>01 / 04</span></div>
            <div className="hero-card-art">
              <div className="paper paper-a"></div>
              <div className="paper paper-b"></div>
              <div className="paper paper-c"></div>
              <div className="parcel"><Package size={64}/><span>YOUR BRAND</span></div>
            </div>
            <div className="hero-card-bottom">
              <span>Print</span><span>Brand</span><span>Package</span><span>Promote</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section intro">
        <div className="container narrow center">
          <div className="eyebrow">ONE PARTNER. MANY POSSIBILITIES.</div>
          <h2>From first impression to final package.</h2>
          <p>Press & Parcel is built for businesses, institutions, events, hospitality, retail and service professionals that need physical branding without coordinating multiple vendors.</p>
        </div>
        <div className="container capability-grid">
          {[
            ["Print","Stationery, marketing collateral, documents and display graphics.",Printer],
            ["Brand","Signage, labels, tags, apparel and identity materials.",Palette],
            ["Package","Boxes, sleeves, bags, labels and product presentation.",Package],
            ["Promote","Merchandise, gifts, event materials and campaigns.",Sparkles]
          ].map(([title,text,Icon]) => (
            <div className="capability" key={title}>
              <div className="icon-box"><Icon size={22}/></div>
              <h3>{title}</h3><p>{text}</p>
              <Link to="/products">Explore <ArrowRight size={15}/></Link>
            </div>
          ))}
        </div>
      </section>

      <section className="section tinted">
        <div className="container">
          <div className="section-head">
            <div><div className="eyebrow">PRODUCT CATALOGUE</div><h2>Built around how you buy.</h2></div>
            <Link className="text-link" to="/products">View all products <ArrowRight size={15}/></Link>
          </div>
          <div className="searchbar">
            <Search size={19}/>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products or categories..." />
          </div>
          <div className="product-grid">
            {filtered.slice(0, 6).map((group, i) => {
              const Icon = group.icon;
              return <Link className="product-card" to="/products" key={group.id}>
                <div className="card-number">0{i+1}</div>
                <div className="icon-box"><Icon size={21}/></div>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
                <div className="chip-row">{group.products.slice(0,3).map(x => <span key={x}>{x}</span>)}</div>
                <span className="card-arrow"><ArrowUpRight size={18}/></span>
              </Link>
            })}
          </div>
        </div>
      </section>

      <section className="section industries-preview">
        <div className="container split">
          <div>
            <div className="eyebrow">BUILT FOR REAL BUSINESSES</div>
            <h2>One platform for every kind of customer.</h2>
            <p>Whether it’s a new startup, a church event, a restaurant launch, a school function or a corporate office, the same platform can turn requirements into a clear print and branding order.</p>
            <Link className="button dark" to="/industries">Explore industries <ArrowRight size={17}/></Link>
          </div>
          <div className="industry-cloud">
            {Object.values(industries).flat().map((x, i) => <span key={x} className={i % 5 === 0 ? "featured-pill" : ""}>{x}</span>)}
          </div>
        </div>
      </section>

      <section className="section quote-banner">
        <div className="container quote-box">
          <div><div className="eyebrow">READY WHEN YOU ARE</div><h2>Tell us what you want to print.</h2><p>Share the product, quantity, artwork and deadline. We’ll structure the requirement into a quote-ready request.</p></div>
          <Link className="button light" to="/quote">Request a Quote <Send size={17}/></Link>
        </div>
      </section>
    </>
  );
}

function Products() {
  const [term, setTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(productGroups[0].products[0]);
  const selectedGroup = productGroups.find(g => g.products.includes(selectedProduct)) || productGroups[0];
  const SelectedIcon = selectedGroup.icon;
  const meta = getProductMeta(selectedProduct, selectedGroup.title);
  const filtered = productGroups.map(g => ({
    ...g,
    products: g.products.filter(p => p.toLowerCase().includes(term.toLowerCase()))
  })).filter(g => g.title.toLowerCase().includes(term.toLowerCase()) || g.products.length);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const group = productGroups.find(g => g.id === hash);
      if (group) setSelectedProduct(group.products[0]);
    }
  }, []);

  return (
    <>
      <PageHero eyebrow="PRODUCT CATALOGUE" title="Print it. Brand it. Package it." text="Explore every product Press & Parcel can provide. Select a product to see its use, typical applications and a visual sample preview." />
      <section className="section products-page">
        <div className="container">
          <div className="searchbar large"><Search size={19}/><input value={term} onChange={e => setTerm(e.target.value)} placeholder="Search the complete catalogue..." /></div>
          <div className="product-explorer">
            <aside className="product-browser">
              {filtered.map(g => {
                const Icon = g.icon;
                return <div className="product-browser-group" key={g.id}>
                  <div className="product-browser-title"><Icon size={17}/><span>{g.title}</span></div>
                  <div className="product-browser-list">
                    {g.products.map(product => <button key={product} className={selectedProduct === product ? "product-item active" : "product-item"} onClick={() => setSelectedProduct(product)}>{product}<ChevronRight size={14}/></button>)}
                  </div>
                </div>;
              })}
            </aside>
            <article className="product-detail-panel">
              <div className="product-detail-head">
                <div className="icon-box"><SelectedIcon size={23}/></div>
                <div><div className="eyebrow">{selectedGroup.title}</div><h2>{selectedProduct}</h2></div>
              </div>
              <p className="product-detail-description">{meta.description}</p>
              <div className="sample-preview" aria-label={`${selectedProduct} sample preview`}>
                <div className="sample-top"><span>PRESS & PARCEL</span><span>SAMPLE</span></div>
                <div className={`sample-art sample-${selectedGroup.id}`}>
                  <div className="sample-shape main"><span>{selectedProduct}</span></div>
                  <div className="sample-shape small one"></div><div className="sample-shape small two"></div>
                </div>
                <div className="sample-bottom"><span>Custom branding</span><span>Made to order</span></div>
              </div>
              <div className="detail-columns">
                <div><h4>Typical uses</h4><div className="detail-list">{meta.uses.map(x => <span key={x}><Check size={15}/>{x}</span>)}</div></div>
                <div><h4>Production / finish</h4><p>{meta.finish}</p></div>
              </div>
              <div className="detail-actions"><Link className="button primary" to={`/quote?product=${encodeURIComponent(selectedProduct)}`}>Request {selectedProduct} <ArrowRight size={16}/></Link><span>Need a custom size, quantity or material? Tell us in the quote.</span></div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}

function Industries() {
  const [selected, setSelected] = useState("Corporate");
  const current = industryUseCases[selected] || [];
  return (
    <>
      <PageHero eyebrow="INDUSTRIES" title="Designed around your field." text="Different industries need different combinations of print, branding, packaging, signage and merchandise. Choose a field to see the typical requirements." />
      <section className="section">
        <div className="container industry-layout">
          <aside className="industry-sidebar">
            {Object.entries(industries).map(([category, list]) => <div key={category} className="industry-category">
              <h4>{category}</h4>
              {list.map(item => <button key={item} className={selected === item ? "industry-btn active" : "industry-btn"} onClick={() => setSelected(item)}>{item}<ChevronRight size={15}/></button>)}
            </div>)}
          </aside>
          <div className="industry-detail">
            <div className="eyebrow">WHAT WE CAN SUPPORT</div>
            <h2>{selected}</h2>
            <p>Press & Parcel can become a single print and branding partner for the physical requirements of a <strong>{selected}</strong> customer.</p>
            <div className="usecase-grid">{current.map(x => <div className="usecase" key={x}><Check size={18}/><span>{x}</span></div>)}</div>
            <div className="industry-cta"><div><strong>Need something not listed?</strong><span>Tell us the requirement and we can build it into the request.</span></div><Link className="button primary" to={`/quote?industry=${encodeURIComponent(selected)}`}>Request for {selected} <ArrowRight size={16}/></Link></div>
          </div>
        </div>
      </section>
    </>
  );
}

function About() {
  return (
    <>
      <PageHero eyebrow="ABOUT PRESS & PARCEL" title="A physical-branding partner, not just a printer." text="The idea behind Press & Parcel is simple: make it easier for organizations to get their print, packaging, merchandise and physical brand presence from one place." />
      <section className="section">
        <div className="container split about-split">
          <div><div className="eyebrow">THE IDEA</div><h2>From scattered vendors to one organized workflow.</h2></div>
          <div><p>Most customers don’t think in printing technologies. They think in outcomes: “I need 500 product labels”, “I need a new office branded”, “I need event material for Saturday”, or “I need packaging for my new product.”</p><p>Press & Parcel is designed around that reality. The platform connects products and industry needs into one simple quotation and order journey.</p></div>
        </div>
      </section>
      <section className="section tinted">
        <div className="container value-grid">
          {[
            ["01","One catalogue","A structured catalogue across print, packaging, apparel, signage and merchandise."],
            ["02","Industry-first discovery","Customers can start with their field and discover what they typically need."],
            ["03","Quote-led ordering","Complex and custom jobs begin with a clear requirement instead of a confusing checkout."],
            ["04","Scalable production","The platform can support in-house production and external production partners as the business grows."]
          ].map(([n,t,d]) => <div className="value-card" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}
        </div>
      </section>
    </>
  );
}

function Contact() {
  return (
    <>
      <PageHero eyebrow="CONTACT PRESS & PARCEL" title="Let’s talk about your next project." text="Have a question, need production guidance or want to discuss a recurring business requirement? Reach out to the Press & Parcel team." />
      <section className="section contact-page">
        <div className="container contact-layout">
          <div className="contact-main">
            <div className="eyebrow">GET IN TOUCH</div>
            <h2>Choose the easiest way to reach us.</h2>
            <p>For a specific printing requirement, use the separate quote form. For general questions or partnership discussions, contact us directly.</p>
            <div className="contact-method-grid">
              <div className="contact-card"><Phone size={22}/><div><strong>Phone</strong><span>+91 XXXXX XXXXX</span><small>Business enquiries & support</small></div></div>
              <div className="contact-card"><Send size={22}/><div><strong>Email</strong><span>hello@pressandparcel.com</span><small>General enquiries & partnerships</small></div></div>
              <div className="contact-card"><Package size={22}/><div><strong>Business Hours</strong><span>Mon – Sat • 9:00 AM – 7:00 PM</span><small>Sunday by prior appointment</small></div></div>
              <div className="contact-card"><Users size={22}/><div><strong>Customer Support</strong><span>Order & production assistance</span><small>We can help refine specifications</small></div></div>
            </div>
            <div className="contact-actions"><Link className="button primary" to="/quote">Start a Quote <ArrowRight size={17}/></Link><a className="button ghost" href="mailto:hello@pressandparcel.com">Email Us <Send size={17}/></a></div>
          </div>
          <div className="contact-side">
            <div className="contact-panel"><div className="eyebrow">PRESS & PARCEL</div><h3>Print • Brand • Package • Promote</h3><p>One partner for business stationery, packaging, apparel, signage, event materials and personalised products.</p><div className="contact-service-list">{["Custom printing", "Branding & signage", "Packaging", "Corporate merchandise", "Event materials"].map(x => <span key={x}><Check size={15}/>{x}</span>)}</div></div>
            <div className="contact-panel light"><div className="eyebrow">FOR PROJECTS</div><h3>Need pricing?</h3><p>Send the product, quantity, deadline and any artwork details. The dedicated quote page is built for project enquiries.</p><Link className="text-link" to="/quote">Go to Get a Quote <ArrowRight size={15}/></Link></div>
          </div>
        </div>
      </section>
    </>
  );
}

function PageHero({eyebrow,title,text}) {
  return <section className="page-hero"><div className="container"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{text}</p></div></section>;
}

function QuoteForm({compact=false}) {
  const params = new URLSearchParams(window.location.search);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name:"",
    company:"",
    phone:"",
    email:"",
    industry:params.get("industry") || "",
    product:params.get("product") || "",
    quantity:"",
    deadline:"",
    details:""
  });

  const update = (key, value) => setForm(prev => ({...prev, [key]:value}));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const apiBase = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiBase}/api/quote`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to submit the quote request.");
      }

      setStatus("success");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="success-box">
        <div className="success-icon"><Check/></div>
        <h2>Request received.</h2>
        <p>
          Thank you for contacting Press & Parcel. A confirmation email has been
          sent to you, and our team has received your requirement. We’ll contact
          you soon to discuss the project.
        </p>
        <button
          className="button primary"
          onClick={() => {
            setForm({
              name:"",
              company:"",
              phone:"",
              email:"",
              industry:"",
              product:"",
              quantity:"",
              deadline:"",
              details:""
            });
            setStatus("idle");
          }}
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form className={compact ? "quote-form compact" : "quote-form"} onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Name
          <input required value={form.name} onChange={e=>update("name",e.target.value)} placeholder="Your name"/>
        </label>
        <label>
          Company / Organisation
          <input value={form.company} onChange={e=>update("company",e.target.value)} placeholder="Company name"/>
        </label>
        <label>
          Phone
          <input required value={form.phone} onChange={e=>update("phone",e.target.value)} placeholder="+91"/>
        </label>
        <label>
          Email
          <input required type="email" value={form.email} onChange={e=>update("email",e.target.value)} placeholder="you@company.com"/>
        </label>
        <label>
          Industry
          <select value={form.industry} onChange={e=>update("industry",e.target.value)}>
            <option value="">Select industry</option>
            {Object.values(industries).flat().map(x=><option key={x}>{x}</option>)}
          </select>
        </label>
        <label>
          Product / Category
          <input value={form.product} onChange={e=>update("product",e.target.value)} placeholder="e.g. product labels"/>
        </label>
        <label>
          Quantity
          <input value={form.quantity} onChange={e=>update("quantity",e.target.value)} placeholder="e.g. 500"/>
        </label>
        <label>
          Required by
          <input type="date" value={form.deadline} onChange={e=>update("deadline",e.target.value)}/>
        </label>
      </div>

      <label>
        Project details
        <textarea
          rows="5"
          value={form.details}
          onChange={e=>update("details",e.target.value)}
          placeholder="Tell us about size, material, artwork, finish, delivery and any other requirement..."
        />
      </label>

      {status === "error" && (
        <div className="form-error">
          {error}
        </div>
      )}

      <button className="button primary submit-btn" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending Request..." : "Send Quote Request"}
        {status !== "sending" && <Send size={17}/>}
      </button>
    </form>
  );
}

function Quote() {
  return <><PageHero eyebrow="GET A QUOTE" title="Start with the requirement." text="Give us the essentials. For custom jobs, we can refine specifications after the initial enquiry."/><section className="section"><div className="container quote-page"><QuoteForm /></div></section></>;
}

export default function App() {
  return <>
    <ScrollToTop />
    <Header />
    <main><Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/products" element={<Products/>}/>
      <Route path="/industries" element={<Industries/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/quote" element={<Quote/>}/>
    </Routes></main>
    <Footer />
  </>;
}