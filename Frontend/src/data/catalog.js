import {
  ClipboardList,
  Factory,
  Package,
  Palette,
  Printer,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Tag
} from "lucide-react";

/* ============================================================
   PRODUCT GROUPS
   ============================================================ */

const productGroups = [
  {
    id: "paper",
    title: "Paper and Commercial Digital Printing",
    icon: Printer,
    description:
      "Professional stationery, marketing collateral and everyday business print.",
    products: [
      "Business Cards",
      "Visiting Cards",
      "Letterheads",
      "Envelopes",
      "Flyers",
      "Leaflets",
      "Brochures",
      "Catalogs",
      "Booklets",
      "Posters",
      "Certificates",
      "Company Folders",
      "Presentation Folders",
      "Notepads",
      "Diaries",
      "Calendars",
      "Menu Cards",
      "Price Lists",
      "Product Sheets",
      "Promotional Cards",
      "Coupon Cards",
      "Door Hangers",
      "Tent Cards"
    ]
  },

  {
    id: "documents",
    title: "Book & Continuous Document Printing",
    icon: ClipboardList,
    description:
      "Numbered and bound business documents for recurring operations.",
    products: [
      "Invoice Books",
      "Receipt Books",
      "Quotation Books"
    ]
  },

  {
    id: "stamps",
    title: "Rubber Stamp Production",
    icon: ShieldCheck,
    description:
      "Office, company and administrative stamps in multiple formats.",
    products: [
      "Rubber Stamps",
      "Self Inking Stamps",
      "Pre Inked Stamps",
      "Date Stamps",
      "Number Stamps",
      "Signature Stamps"
    ]
  },

  {
    id: "apparel",
    title: "Apparel Printing",
    icon: ShoppingBag,
    description:
      "Branded apparel for teams, businesses, institutions and campaigns.",
    products: [
      "T-shirt",
      "Hoodies",
      "Sweatshirts",
      "Polo T-shirts",
      "Jerseys",
      "Aprons"
    ]
  },

  {
    id: "fabric",
    title: "Fabric & Textile Products",
    icon: Package,
    description:
      "Custom fabric merchandise and reusable textile products.",
    products: [
      "Tote Bags",
      "Drawstring Bags",
      "Fabric Pouchees",
      "Cloth Bags",
      "Pillow Covers"
    ]
  },

  {
    id: "caps",
    title: "Cap Customization",
    icon: Sparkles,
    description:
      "Branded headwear using patches and direct customization.",
    products: [
      "Embroidery Patches",
      "Direct Cap Printing"
    ]
  },

  {
    id: "large-format",
    title: "Large Format Flexible Printing",
    icon: Factory,
    description:
      "High-impact flexible displays for advertising, events and promotions.",
    products: [
      "Banners",
      "Flex Boards",
      "Fabric Banners"
    ]
  },

  {
    id: "rigid",
    title: "Rigid Board Printing",
    icon: Palette,
    description:
      "Mounted displays and rigid presentation materials.",
    products: [
      "Foam - Board Signs",
      "Advertising Boards",
      "Standee Prints",
      "A-Frames",
      "Table Top Displays"
    ]
  },

  {
    id: "stickers",
    title: "Sticker & Label Printing",
    icon: Tag,
    description:
      "Product, packaging and promotional labels in practical finishes.",
    products: [
      "Product Labels",
      "Packing Stickers",
      "Logo Stickers",
      "Thank-you Stickers",
      "Bottle Labels",
      "Jar Labels",
      "Food Labels"
    ]
  },

  {
    id: "tags",
    title: "Product Tag & Hang Tag Printing",
    icon: Tag,
    description:
      "Retail and product identification tags for branded goods.",
    products: [
      "Product Tags",
      "Hang Tags",
      "Clothing Tags",
      "Price Tags",
      "Jewellery Tags"
    ]
  },

  {
    id: "packaging",
    title: "Packing Paper Products",
    icon: Package,
    description:
      "Printed packaging for retail, food, gifts and e-commerce brands.",
    products: [
      "Paper Bags",
      "Packing Sleeves",
      "Product Boxes",
      "Gift Boxes",
      "Food Boxes",
      "Cosmetic Boxes",
      "Retail Boxes",
      "Shipping Boxes"
    ]
  },

  {
    id: "events",
    title: "Event Display Materials",
    icon: Sparkles,
    description:
      "Event-ready displays and guest materials for memorable occasions.",
    products: [
      "Welcome Boards",
      "Seating Charts",
      "Table Numbers",
      "Stage Banners",
      "Event Badges",
      "Wristbands"
    ]
  },

  {
    id: "personalised",
    title: "Personalised Hard Surface Printing",
    icon: Sparkles,
    description:
      "Custom gifts and branded everyday products made for people and businesses.",
    products: [
      "Personalised Mugs",
      "Personalised Cushions",
      "Personalized Keychains",
      "Personalised Bottles",
      "Personalised Sippers",
      "Personalised Photo Gifts",
      "Personalised Pens",
      "Personalised Notebooks"
    ]
  }
];

/* ============================================================
   PRODUCT META
   ============================================================ */

const productMeta = {
  "Business Cards": {
    description:
      "Professional first-impression cards for employees, founders, sales teams and customer-facing staff.",
    uses: [
      "Corporate identity",
      "Sales teams",
      "Networking"
    ],
    finish:
      "Digital print • Premium cardstock • Matte / gloss finishes"
  },

  "Visiting Cards": {
    description:
      "Personal contact cards for professionals, consultants and local businesses.",
    uses: [
      "Professional services",
      "Appointments",
      "Networking"
    ],
    finish:
      "Cardstock • Single / double side • Optional lamination"
  },

  "Letterheads": {
    description:
      "Branded documents that keep every official communication consistent.",
    uses: [
      "Business correspondence",
      "Institutions",
      "Invoices & notices"
    ],
    finish:
      "A4 / A5 • Premium paper • Colour or mono"
  },

  "Envelopes": {
    description:
      "Branded envelopes for formal correspondence, invoices, certificates and customer communication.",
    uses: [
      "Corporate mail",
      "Institutions",
      "Invitations"
    ],
    finish:
      "Printed flap • Multiple sizes • Custom stock"
  },

  "Flyers": {
    description:
      "Fast, economical promotional sheets for local campaigns and offers.",
    uses: [
      "Retail promotions",
      "Events",
      "Service businesses"
    ],
    finish:
      "Single / double side • Multiple sizes"
  },

  "Leaflets": {
    description:
      "Compact promotional handouts for high-volume distribution.",
    uses: [
      "Door-to-door",
      "Local campaigns",
      "Product awareness"
    ],
    finish:
      "Lightweight paper • Bulk production"
  },

  "Brochures": {
    description:
      "Structured marketing collateral that explains a business, service or product.",
    uses: [
      "Corporate profiles",
      "Real estate",
      "Hospitality"
    ],
    finish:
      "Folded formats • Premium paper"
  },

  "Catalogs": {
    description:
      "Multi-product marketing books designed to present collections and ranges clearly.",
    uses: [
      "Retail",
      "Manufacturing",
      "D2C brands"
    ],
    finish:
      "Multi-page • Saddle / perfect binding"
  },

  "Booklets": {
    description:
      "Compact multi-page publications for information, programs and promotional content.",
    uses: [
      "Churches",
      "Schools",
      "Events"
    ],
    finish:
      "Folded / bound • Custom page count"
  },

  "Posters": {
    description:
      "High-visibility promotional and informational graphics for walls and displays.",
    uses: [
      "Offers",
      "Events",
      "Awareness campaigns"
    ],
    finish:
      "A4 to large formats • Matte / gloss"
  },

  "Certificates": {
    description:
      "Formal recognition documents for institutions, events, training and achievements.",
    uses: [
      "Schools",
      "Churches",
      "Corporate awards"
    ],
    finish:
      "Premium cardstock • Optional lamination"
  },

  "Company Folders": {
    description:
      "Branded presentation folders for documents, proposals and sales material.",
    uses: [
      "Corporate",
      "Real estate",
      "Consulting"
    ],
    finish:
      "Die-cut pockets • Premium cardstock"
  },

  "Presentation Folders": {
    description:
      "Client-facing folders that organize brochures, proposals and supporting documents.",
    uses: [
      "Sales meetings",
      "Proposals",
      "Conferences"
    ],
    finish:
      "Custom pockets • Printed cover"
  },

  "Notepads": {
    description:
      "Branded writing pads for offices, teams, meetings and customer giveaways.",
    uses: [
      "Meetings",
      "Training",
      "Corporate gifts"
    ],
    finish:
      "Glued pads • Multiple sheet counts"
  },

  "Diaries": {
    description:
      "Branded yearly diaries for teams, customers and corporate gifting.",
    uses: [
      "Employee gifts",
      "Customer gifts",
      "Institutions"
    ],
    finish:
      "Hard / soft cover • Custom branding"
  },

  "Calendars": {
    description:
      "Wall, desk or promotional calendars carrying your brand throughout the year.",
    uses: [
      "Corporate gifting",
      "Retail",
      "Organizations"
    ],
    finish:
      "Wall / desk formats • Custom pages"
  },

  "Menu Cards": {
    description:
      "Customer-facing menus designed around readability, brand identity and frequent updates.",
    uses: [
      "Restaurants",
      "Cafes",
      "Hotels"
    ],
    finish:
      "Laminated / premium stock"
  },

  "Price Lists": {
    description:
      "Clear product or service price communication for counters, sales teams and customers.",
    uses: [
      "Retail",
      "Restaurants",
      "Service businesses"
    ],
    finish:
      "Single / multi-page • Easy-to-update formats"
  },

  "Product Sheets": {
    description:
      "Focused product information sheets for sales, retail and B2B communication.",
    uses: [
      "Manufacturing",
      "Electronics",
      "Real estate"
    ],
    finish:
      "A4 / A3 • Single / double side"
  },

  "Promotional Cards": {
    description:
      "Compact branded cards for offers, announcements, referrals and campaigns.",
    uses: [
      "Retail",
      "Restaurants",
      "Events"
    ],
    finish:
      "Cardstock • Optional rounded corners"
  },

  "Coupon Cards": {
    description:
      "Printed offer cards that encourage repeat visits and customer action.",
    uses: [
      "Retail",
      "Restaurants",
      "Salons"
    ],
    finish:
      "Cardstock • Numbering / codes optional"
  },

  "Door Hangers": {
    description:
      "Hanging promotional or informational pieces designed for doors and handles.",
    uses: [
      "Hotels",
      "Real estate",
      "Service businesses"
    ],
    finish:
      "Die-cut • Heavy cardstock"
  },

  "Tent Cards": {
    description:
      "Small folded counter or table displays for offers, QR codes and announcements.",
    uses: [
      "Restaurants",
      "Hotels",
      "Events"
    ],
    finish:
      "Folded cardstock • Tabletop format"
  },

  "Invoice Books": {
    description:
      "Branded duplicate or triplicate books for invoicing and record keeping.",
    uses: [
      "Retail",
      "Offices",
      "Small businesses"
    ],
    finish:
      "Numbered • NCR / carbonless options"
  },

  "Receipt Books": {
    description:
      "Sequential receipt books for payments, donations and everyday transactions.",
    uses: [
      "Churches",
      "Retail",
      "Organizations"
    ],
    finish:
      "Numbered • Duplicate / triplicate"
  },

  "Quotation Books": {
    description:
      "Professional quotation books for sales teams and service businesses.",
    uses: [
      "Contractors",
      "Consultants",
      "Small businesses"
    ],
    finish:
      "Numbered • Multi-copy options"
  },

  "Rubber Stamps": {
    description:
      "General-purpose custom stamps for company and administrative use.",
    uses: [
      "Offices",
      "Institutions",
      "Retail"
    ],
    finish:
      "Custom plate • Multiple sizes"
  },

  "Self Inking Stamps": {
    description:
      "Convenient reusable stamps with integrated ink for fast daily use.",
    uses: [
      "Offices",
      "Banks",
      "Schools"
    ],
    finish:
      "Self-contained ink mechanism"
  },

  "Pre Inked Stamps": {
    description:
      "Compact stamps designed for crisp impressions with built-in ink.",
    uses: [
      "Signatures",
      "Approvals",
      "Administrative work"
    ],
    finish:
      "Fine detail • Compact body"
  },

  "Date Stamps": {
    description:
      "Adjustable date stamps for document processing and records.",
    uses: [
      "Offices",
      "Banks",
      "Warehouses"
    ],
    finish:
      "Adjustable date bands"
  },

  "Number Stamps": {
    description:
      "Sequential or fixed number stamps for tracking and documentation.",
    uses: [
      "Invoices",
      "Inventory",
      "Records"
    ],
    finish:
      "Number bands • Custom configurations"
  },

  "Signature Stamps": {
    description:
      "Custom signature reproduction stamps for authorized workflows.",
    uses: [
      "Office approvals",
      "Administrative processes",
      "Routine documents"
    ],
    finish:
      "Custom stamp plate"
  },

  "T-shirt": {
    description:
      "Custom printed tees for teams, campaigns, events, brands and merchandise.",
    uses: [
      "Company teams",
      "Events",
      "Merchandise"
    ],
    finish:
      "DTF / screen / suitable transfer methods"
  },

  "Hoodies": {
    description:
      "Premium branded hoodies for teams, communities and merchandise drops.",
    uses: [
      "IT teams",
      "Colleges",
      "Brands"
    ],
    finish:
      "Front / back / sleeve branding"
  },

  "Sweatshirts": {
    description:
      "Comfortable branded sweatshirts for teams and promotional use.",
    uses: [
      "Institutions",
      "Clubs",
      "Corporate teams"
    ],
    finish:
      "Custom chest / back print"
  },

  "Polo T-shirts": {
    description:
      "Smart branded polos suited to staff uniforms and corporate teams.",
    uses: [
      "Hospitality",
      "Corporate",
      "Retail"
    ],
    finish:
      "Chest logo • Sleeve / back options"
  },

  "Jerseys": {
    description:
      "Custom sports jerseys with names, numbers and team identity.",
    uses: [
      "Colleges",
      "Gyms",
      "Sports teams"
    ],
    finish:
      "Name / number / sponsor branding"
  },

  "Aprons": {
    description:
      "Branded work aprons for food, hospitality, salons and craft businesses.",
    uses: [
      "Restaurants",
      "Bakeries",
      "Salons"
    ],
    finish:
      "Logo print / patch options"
  },

  "Tote Bags": {
    description:
      "Reusable branded fabric bags for retail, events and promotional campaigns.",
    uses: [
      "Retail",
      "Events",
      "Corporate gifts"
    ],
    finish:
      "Fabric print / transfer"
  },

  "Drawstring Bags": {
    description:
      "Lightweight branded bags for events, sports and promotional kits.",
    uses: [
      "Events",
      "Gyms",
      "Schools"
    ],
    finish:
      "Fabric print / transfer"
  },

  "Fabric Pouchees": {
    description:
      "Compact custom pouches for gifting, products and promotional kits.",
    uses: [
      "Gift brands",
      "Events",
      "D2C"
    ],
    finish:
      "Fabric print / transfer"
  },

  "Cloth Bags": {
    description:
      "Reusable cloth bags for sustainable retail and promotional branding.",
    uses: [
      "Retail",
      "Grocery",
      "Events"
    ],
    finish:
      "Fabric print / transfer"
  },

  "Pillow Covers": {
    description:
      "Personalised textile covers for gifts, decor and event merchandise.",
    uses: [
      "Gifts",
      "Events",
      "Home decor"
    ],
    finish:
      "Sublimation / suitable textile transfer"
  },

  "Embroidery Patches": {
    description:
      "Branded patches that can be applied to caps, uniforms and apparel.",
    uses: [
      "Teams",
      "Uniforms",
      "Merchandise"
    ],
    finish:
      "Embroidered patch with backing"
  },

  "Direct Cap Printing": {
    description:
      "Custom cap decoration for teams, brands and promotional campaigns.",
    uses: [
      "Events",
      "Brands",
      "Clubs"
    ],
    finish:
      "Direct print / transfer"
  },

  "Banners": {
    description:
      "Large visual communication for events, storefronts and promotions.",
    uses: [
      "Events",
      "Retail",
      "Campaigns"
    ],
    finish:
      "Large-format flexible print"
  },

  "Flex Boards": {
    description:
      "Flexible outdoor advertising graphics for high-visibility placements.",
    uses: [
      "Retail",
      "Real estate",
      "Events"
    ],
    finish:
      "Flex media • Eyelets / finishing"
  },

  "Event Banners": {
    description:
      "Event-specific banners for entrances, stages, announcements and branding.",
    uses: [
      "Weddings",
      "Conferences",
      "Church events"
    ],
    finish:
      "Flexible print • Custom sizes"
  },

  "Flex Advertising Prints": {
    description:
      "Cost-effective large promotional prints for repeated campaigns.",
    uses: [
      "Retail",
      "Real estate",
      "Local advertising"
    ],
    finish:
      "Outdoor flex media"
  },

  "Fabric Banners": {
    description:
      "Lightweight textile banners with a premium event presentation.",
    uses: [
      "Events",
      "Conferences",
      "Exhibitions"
    ],
    finish:
      "Fabric print • Hemming options"
  },

  "PVC Banners": {
    description:
      "Durable flexible PVC graphics for indoor and outdoor applications.",
    uses: [
      "Retail",
      "Construction",
      "Events"
    ],
    finish:
      "PVC media • Finishing options"
  },

  "Foam - Board Signs": {
    description:
      "Lightweight rigid signs for indoor displays and short-term promotions.",
    uses: [
      "Offices",
      "Events",
      "Retail"
    ],
    finish:
      "Foam board mounting"
  },

  "Advertising Boards": {
    description:
      "Rigid promotional boards for storefronts, campaigns and displays.",
    uses: [
      "Retail",
      "Real estate",
      "Events"
    ],
    finish:
      "Rigid substrate • Custom cut"
  },

  "Standee Prints": {
    description:
      "Freestanding promotional graphics that attract attention at entrances and events.",
    uses: [
      "Retail",
      "Conferences",
      "Events"
    ],
    finish:
      "Printed board / stand system"
  },

  "A-Frames": {
    description:
      "Portable two-sided display boards for sidewalks, entrances and events.",
    uses: [
      "Restaurants",
      "Retail",
      "Banquets"
    ],
    finish:
      "Rigid panels • Folding frame"
  },

  "Table Top Displays": {
    description:
      "Compact countertop branding for offers, QR codes and product information.",
    uses: [
      "Restaurants",
      "Hotels",
      "Retail"
    ],
    finish:
      "Rigid/card display formats"
  },

  "Product Labels": {
    description:
      "Brand and product information labels for packaged goods.",
    uses: [
      "D2C",
      "Manufacturing",
      "Retail"
    ],
    finish:
      "Paper / synthetic / waterproof options"
  },

  "Packing Stickers": {
    description:
      "Branded adhesive stickers that complete the look of shipped or retail packaging.",
    uses: [
      "D2C",
      "Food",
      "Gift shops"
    ],
    finish:
      "Paper / vinyl / waterproof options"
  },

  "Logo Stickers": {
    description:
      "Simple brand marks for packaging, products, laptops and promotional use.",
    uses: [
      "Startups",
      "Brands",
      "Events"
    ],
    finish:
      "Die-cut / kiss-cut options"
  },

  "Thank-you Stickers": {
    description:
      "Small packaging stickers that add a branded customer experience.",
    uses: [
      "E-commerce",
      "Gift shops",
      "Bakeries"
    ],
    finish:
      "Adhesive label stock"
  },

  "Bottle Labels": {
    description:
      "Custom labels for water, beverage, cosmetic and other bottles.",
    uses: [
      "Bakeries",
      "Events",
      "D2C brands"
    ],
    finish:
      "Water-resistant options"
  },

  "Jar Labels": {
    description:
      "Product labels for jars, candles, food, cosmetics and handmade products.",
    uses: [
      "D2C",
      "Food",
      "Gift brands"
    ],
    finish:
      "Custom shapes • Waterproof options"
  },

  "Food Labels": {
    description:
      "Food packaging labels for product identity and customer information.",
    uses: [
      "Bakeries",
      "Restaurants",
      "Food brands"
    ],
    finish:
      "Food-suitable material options"
  },

  "Product Tags": {
    description:
      "Printed tags that communicate product, price and brand information.",
    uses: [
      "Retail",
      "Clothing",
      "Gift shops"
    ],
    finish:
      "Cardstock • Hole punch options"
  },

  "Hang Tags": {
    description:
      "Branded hanging tags for products, apparel and retail presentation.",
    uses: [
      "Clothing",
      "Accessories",
      "Gift shops"
    ],
    finish:
      "Die-cut cardstock • String options"
  },

  "Clothing Tags": {
    description:
      "Brand and care-related tags for apparel and textile products.",
    uses: [
      "Fashion",
      "Uniforms",
      "Boutiques"
    ],
    finish:
      "Printed card / fabric tag options"
  },

  "Price Tags": {
    description:
      "Simple product pricing tags for stores and retail displays.",
    uses: [
      "Retail",
      "Gift shops",
      "Clothing"
    ],
    finish:
      "Card / adhesive formats"
  },

  "Jewellery Tags": {
    description:
      "Small premium tags designed for jewellery and accessories.",
    uses: [
      "Jewellery",
      "Boutiques",
      "Gift shops"
    ],
    finish:
      "Small-format premium stock"
  },

  "Paper Bags": {
    description:
      "Branded carry bags for shops, restaurants, events and gifts.",
    uses: [
      "Retail",
      "Restaurants",
      "Gift shops"
    ],
    finish:
      "Paper stock • Handles / custom print"
  },

  "Packing Sleeves": {
    description:
      "Printed sleeves that add brand presentation around boxes and products.",
    uses: [
      "D2C",
      "Food",
      "Cosmetics"
    ],
    finish:
      "Folded / glued paper sleeve"
  },

  "Product Boxes": {
    description:
      "Custom printed boxes for products, retail presentation and shipping.",
    uses: [
      "D2C",
      "Retail",
      "Manufacturing"
    ],
    finish:
      "Die-cut • Creased • Folded"
  },

  "Gift Boxes": {
    description:
      "Branded gift packaging for premium presentation and celebrations.",
    uses: [
      "Gifts",
      "Corporate",
      "Events"
    ],
    finish:
      "Premium board • Custom finishing"
  },

  "Food Boxes": {
    description:
      "Printed boxes for takeaway, bakery and food presentation.",
    uses: [
      "Restaurants",
      "Bakeries",
      "Food brands"
    ],
    finish:
      "Food-packaging material options"
  },

  "Cosmetic Boxes": {
    description:
      "Retail-ready boxes for beauty and personal-care products.",
    uses: [
      "Cosmetics",
      "Salons",
      "D2C"
    ],
    finish:
      "Premium printed board"
  },

  "Retail Boxes": {
    description:
      "Branded packaging designed for shelf presentation and customer experience.",
    uses: [
      "Retail",
      "Electronics",
      "Gift shops"
    ],
    finish:
      "Printed board • Custom dielines"
  },

  "Shipping Boxes": {
    description:
      "Branded outer packaging for e-commerce and product dispatch.",
    uses: [
      "E-commerce",
      "D2C",
      "Retail"
    ],
    finish:
      "Corrugated / printed options"
  },

  "Welcome Boards": {
    description:
      "Entrance display boards that introduce guests to an event or venue.",
    uses: [
      "Weddings",
      "Banquets",
      "Conferences"
    ],
    finish:
      "Rigid board / mounted print"
  },

  "Seating Charts": {
    description:
      "Organised guest seating displays for weddings, banquets and conferences.",
    uses: [
      "Weddings",
      "Banquets",
      "Events"
    ],
    finish:
      "Mounted print / display board"
  },

  "Table Numbers": {
    description:
      "Clear table identification displays for guests and service teams.",
    uses: [
      "Weddings",
      "Banquets",
      "Hotels"
    ],
    finish:
      "Card / acrylic / rigid display"
  },

  "Stage Banners": {
    description:
      "Large-format stage branding for ceremonies, conferences and performances.",
    uses: [
      "Events",
      "Churches",
      "Colleges"
    ],
    finish:
      "Large-format print"
  },

  "Event Badges": {
    description:
      "Branded attendee badges for identification and event organisation.",
    uses: [
      "Conferences",
      "Corporate events",
      "Schools"
    ],
    finish:
      "Card/PVC options • Holder/lanyard compatible"
  },

  "Wristbands": {
    description:
      "Event identification bands for access control and guest grouping.",
    uses: [
      "Concerts",
      "Events",
      "Banquets"
    ],
    finish:
      "Paper / synthetic event bands"
  },

  "Personalised Mugs": {
    description:
      "Custom mugs with names, photos, logos or artwork.",
    uses: [
      "Gifts",
      "Corporate",
      "Events"
    ],
    finish:
      "Sublimation / suitable hard-surface print"
  },

  "Personalised Cushions": {
    description:
      "Photo and artwork cushions for gifts, celebrations and merchandise.",
    uses: [
      "Gifts",
      "Events",
      "Home decor"
    ],
    finish:
      "Textile transfer / sublimation"
  },

  "Personalised Keychains": {
    description:
      "Small custom gifts or branded giveaways with names, logos or images.",
    uses: [
      "Corporate gifts",
      "Events",
      "Retail"
    ],
    finish:
      "Acrylic / metal / sublimation options"
  },

  "Personalised Bottles": {
    description:
      "Custom branded bottles for employees, teams, events and gifts.",
    uses: [
      "Corporate",
      "Gyms",
      "Events"
    ],
    finish:
      "UV / transfer / engraving options"
  },

  "Personalised Sippers": {
    description:
      "Custom sippers for teams, schools, gyms and promotional campaigns.",
    uses: [
      "Gyms",
      "Schools",
      "Corporate"
    ],
    finish:
      "Suitable hard-surface customization"
  },

  "Personalised Photo Gifts": {
    description:
      "Photo-led keepsakes that turn personal images into branded gifts.",
    uses: [
      "Birthdays",
      "Weddings",
      "Anniversaries"
    ],
    finish:
      "Product-specific photo customization"
  },

  "Personalised Notebooks": {
    description:
      "Custom notebooks for personal use, corporate gifting, events and branded stationery.",
    uses: [
      "Corporate gifts",
      "Events",
      "Personal use"
    ],
    finish:
      "Custom cover printing • Multiple sizes • Multiple page options"
  },

  "Personalised Pens": {
    description:
      "Branded pens for corporate giveaways, events and everyday promotion.",
    uses: [
      "Corporate",
      "Events",
      "Schools"
    ],
    finish:
      "Pad/UV/laser branding depending on pen"
  }
};

/* ============================================================
   PRODUCT META FALLBACK
   ============================================================ */

const getProductMeta = (product, groupTitle) =>
  productMeta[product] || {
    description: `Custom ${product.toLowerCase()} produced for ${groupTitle.toLowerCase()} requirements.`,
    uses: [
      "Business branding",
      "Events",
      "Promotional use"
    ],
    finish:
      "Custom size • Material • Finish based on requirement"
  };

/* ============================================================
   PRODUCT IMAGES
   ============================================================ */

const assetImages = import.meta.glob(
  "../Assets/*.{jpg,jpeg,png,webp}",
  {
    eager: true,
    query: "?url",
    import: "default"
  }
);

const getAssetImage = (filename) => {
  const imagePath = `../Assets/${filename}`;

  return assetImages[imagePath] || "";
};

const productImages = {
  "Business Cards": [
    getAssetImage("Business_Card_1.jpg"),
    getAssetImage("Business_Card_2.jpg"),
    getAssetImage("Business_Card_3.jpg")
  ],

  "Visiting Cards": [
    getAssetImage("Visiting_Card_1.jpg"),
    getAssetImage("Visiting_Card_2.jpg"),
    getAssetImage("Visiting_Card_3.jpg")
  ],

  "Letterheads": [
    getAssetImage("Letter_Head_1.jpg"),
    getAssetImage("Letter_Head_2.jpg"),
    getAssetImage("Letter_Head_3.jpg")
  ],

  "Envelopes": [
    getAssetImage("Envelope_1.jpg"),
    getAssetImage("Envelope_2.jpg"),
    getAssetImage("Envelope_3.jpg")
  ],

  "Flyers": [
    getAssetImage("Flyer_1.jpg"),
    getAssetImage("Flyer_2.jpg"),
    getAssetImage("Flyer_3.jpg")
  ],

  "Leaflets": [
    getAssetImage("Leaflet_1.jpg"),
    getAssetImage("Leaflet_2.jpg"),
    getAssetImage("Leaflet_3.jpg")
  ],

  "Brochures": [
    getAssetImage("Brochure_1.jpg"),
    getAssetImage("Brochure_2.jpg"),
    getAssetImage("Brochure_3.jpg")
  ],

  "Catalogs": [
    getAssetImage("Catalog_1.jpg"),
    getAssetImage("Catalog_2.jpg"),
    getAssetImage("Catalog_3.jpg")
  ],

  "Booklets": [
    getAssetImage("Booklet_1.jpg"),
    getAssetImage("Booklet_2.jpg"),
    getAssetImage("Booklet_3.jpg")
  ],

  "Posters": [
    getAssetImage("Poster_1.jpg"),
    getAssetImage("Poster_2.jpg"),
    getAssetImage("Poster_3.jpg")
  ],

  "Certificates": [
    getAssetImage("Certificate_1.jpg"),
    getAssetImage("Certificate_2.jpg"),
    getAssetImage("Certificate_3.jpg")
  ],

  "Company Folders": [
    getAssetImage("Company_Folder_1.jpg"),
    getAssetImage("Company_Folder_2.jpg"),
    getAssetImage("Company_Folder_3.jpg")
  ],

  "Presentation Folders": [
    getAssetImage("Presentation_Folder_1.jpg"),
    getAssetImage("Presentation_Folder_2.jpg"),
    getAssetImage("Presentation_Folder_3.jpg")
  ],

  "Notepads": [
    getAssetImage("Notepad_1.png"),
    getAssetImage("Notepad_2.jpg"),
    getAssetImage("Notepad_3.jpg")
  ],

  "Diaries": [
    getAssetImage("Dairy_1.jpg"),
    getAssetImage("Dairy_2.jpg"),
    getAssetImage("Dairy_3.jpg")
  ],

  "Calendars": [
    getAssetImage("Calender_1.jpg"),
    getAssetImage("Calender_2.jpg"),
    getAssetImage("Calender_3.jpg")
  ],

  "Menu Cards": [
    getAssetImage("Menu_Card_1.jpg"),
    getAssetImage("Menu_Card_2.jpg"),
    getAssetImage("Menu_Card_3.jpg")
  ],

  "Price Lists": [
    getAssetImage("Price_List_1.png"),
    getAssetImage("Price_List_2.png"),
    getAssetImage("Price_List_3.jpg")
  ],

  "Product Sheets": [
    getAssetImage("Product_Sheet_1.jpg"),
    getAssetImage("Product_Sheet_2.jpg"),
    getAssetImage("Product_Sheet_3.jpg")
  ],

  "Promotional Cards": [
    getAssetImage("Promotional_Card_1.jpg"),
    getAssetImage("Promotional_Card_2.jpg"),
    getAssetImage("Promotional_Card_3.jpg")
  ],

  "Coupon Cards": [
    getAssetImage("Coupon_Card_1.jpg"),
    getAssetImage("Coupon_Card_2.jpg"),
    getAssetImage("Coupon_Card_3.jpg")
  ],

  "Door Hangers": [
    getAssetImage("Door_Hanger_1.jpg"),
    getAssetImage("Door_Hanger_2.jpg"),
    getAssetImage("Door_Hanger_3.jpg")
  ],

  "Tent Cards": [
    getAssetImage("Tent_Card_1.jpg"),
    getAssetImage("Tent_Card_2.jpg"),
    getAssetImage("Tent_Card_3.jpg")
  ],

  "Invoice Books": [
    getAssetImage("Invoice_Books_1.jpg"),
    getAssetImage("Invoice_Books_2.jpg"),
    getAssetImage("Invoice_Books_3.png")
  ],

  "Receipt Books": [
    getAssetImage("Receipt_Books_1.jpg"),
    getAssetImage("Receipt_Books_2.jpg"),
    getAssetImage("Receipt_Books_3.jpg")
  ],

  "Quotation Books": [
    getAssetImage("Quotation_Books_1.jpg"),
    getAssetImage("Quotation_Books_2.jpg"),
    getAssetImage("Quotation_Books_3.png")
  ],

  "Rubber Stamps": [
    getAssetImage("Rubber_Stamp_1.jpg"),
    getAssetImage("Rubber_Stamp_2.jpg"),
    getAssetImage("Rubber_Stamp_3.jpg")
  ],

  "Self Inking Stamps": [
    getAssetImage("Self_Inking_Stamps_1.jpg"),
    getAssetImage("Self_Inking_Stamps_2.jpg"),
    getAssetImage("Self_Inking_Stamps_3.jpg")
  ],

  "Pre Inked Stamps": [
    getAssetImage("Pre_Ink_Stamp_1.jpg"),
    getAssetImage("Pre_Ink_Stamp_2.jpg"),
    getAssetImage("Pre_Ink_Stamp_3.jpg")
  ],

  "Date Stamps": [
    getAssetImage("Date_Stamp_1.jpg"),
    getAssetImage("Date_Stamp_2.jpg"),
    getAssetImage("Date_Stamp_3.jpg")
  ],

  "Number Stamps": [
    getAssetImage("Number_Stamp_1.jpg"),
    getAssetImage("Number_Stamp_2.jpg"),
    getAssetImage("Number_Stamp_3.jpg")
  ],

  "Signature Stamps": [
    getAssetImage("Signature_Stamp_1.jpg"),
    getAssetImage("Signature_Stamp_2.jpg"),
    getAssetImage("Signature_Stamp_3.jpg")
  ],

  "T-shirt": [
    getAssetImage("T_Shirt_1.jpg"),
    getAssetImage("T_Shirt_2.jpg"),
    getAssetImage("T_Shirt_3.jpg")
  ],

  "Hoodies": [
    getAssetImage("Hoodie_1.jpg"),
    getAssetImage("Hoodie_2.jpg"),
    getAssetImage("Hoodie_3.jpg")
  ],

  "Sweatshirts": [
    getAssetImage("Sweatshirt_1.jpg"),
    getAssetImage("Sweatshirt_2.jpg"),
    getAssetImage("Sweatshirt_3.jpg")
  ],

  "Polo T-shirts": [
    getAssetImage("Polo_Tshirt_1.jpg"),
    getAssetImage("Polo_Tshirt_2.jpg"),
    getAssetImage("Polo_Tshirt_3.jpg")
  ],

  "Jerseys": [
    getAssetImage("Jersey_1.jpg"),
    getAssetImage("Jersey_2.jpg"),
    getAssetImage("Jersey_3.jpg")
  ],

  "Aprons": [
    getAssetImage("Apron_1.jpg"),
    getAssetImage("Apron_2.jpg"),
    getAssetImage("Apron_3.jpg")
  ],

  "Tote Bags": [
    getAssetImage("Tote_Bag_1.jpg"),
    getAssetImage("Tote_Bag_2.jpg"),
    getAssetImage("Tote_Bag_3.jpg")
  ],

  "Drawstring Bags": [
    getAssetImage("Drawstring_Bag_1.jpg"),
    getAssetImage("Drawstring_Bag_2.jpg"),
    getAssetImage("Drawstring_Bag_3.jpg")
  ],

  "Fabric Pouchees": [
    getAssetImage("Fabric_Pouch_1.jpg"),
    getAssetImage("Fabric_Pouch_2.jpg"),
    getAssetImage("Fabric_Pouch_3.jpg")
  ],

  "Cloth Bags": [
    getAssetImage("Cloth_Bag_1.jpg"),
    getAssetImage("Cotton_Bag_2.jpg"),
    getAssetImage("Cotton_Bag_3.jpg")
  ],

  "Pillow Covers": [
    getAssetImage("Pollow_Cover_1.jpg"),
    getAssetImage("Pillow_Cover_2.jpg"),
    getAssetImage("Pillow_Cover_3.jpg")
  ],

  "Embroidery Patches": [
    getAssetImage("Embroidary_Cap_1.jpg"),
    getAssetImage("Embroidary_Cap_2.jpg"),
    getAssetImage("Embroidary_Cap_3.jpg")
  ],

  "Direct Cap Printing": [
    getAssetImage("Printed_Cap_1.jpg"),
    getAssetImage("Printed_Cap_2.jpg"),
    getAssetImage("Printed_Cap_3.jpg")
  ],

  "Banners": [
    getAssetImage("Banner_1.jpg"),
    getAssetImage("Banner_2.jpg"),
    getAssetImage("Banner_3.jpg")
  ],

  "Flex Boards": [
    getAssetImage("Flex_Board_1.jpg"),
    getAssetImage("Flex_Board_2.jpg"),
    getAssetImage("Flex_Board_3.jpg")
  ],

  "Fabric Banners": [
    getAssetImage("Fabric_Banner_1.jpg"),
    getAssetImage("Fabric_Banner_2.jpg"),
    getAssetImage("Fabric_Banner_3.jpg")
  ],

  "Foam - Board Signs": [
    getAssetImage("Foam_Sign_Board_1.png"),
    getAssetImage("Foam_Sign_Board_2.jpg"),
    getAssetImage("Foam_Sign_Board_3.jpg")
  ],

  "Advertising Boards": [
    getAssetImage("Advertising_Board_1.jpg"),
    getAssetImage("Advertising_Board_2.jpg"),
    getAssetImage("Advertising_Board_3.jpg")
  ],

  "Standee Prints": [
    getAssetImage("Standee_Print_1.jpg"),
    getAssetImage("Standee_Print_2.jpg"),
    getAssetImage("Standee_Print_3.jpg")
  ],

  "A-Frames": [
    getAssetImage("AFrame_1.jpg"),
    getAssetImage("AFrame_2.jpg"),
    getAssetImage("AFrame_3.jpg")
  ],

  "Table Top Displays": [
    getAssetImage("Table_Top_Display_1.jpg"),
    getAssetImage("Table_Top_Display_2.jpg"),
    getAssetImage("Table_Top_Display_3.jpg")
  ],

  "Product Labels": [
    getAssetImage("Product_Labels_1.jpg"),
    getAssetImage("Product_Labels_2.jpg"),
    getAssetImage("Product_Labels_3.jpg")
  ],

  "Packing Stickers": [
    getAssetImage("Packing_Stickers_1.jpg"),
    getAssetImage("Packing_Stickers_2.jpg"),
    getAssetImage("Packing_Stickers_3.jpg")
  ],

  "Logo Stickers": [
    getAssetImage("Logo_Stickers_1.jpg"),
    getAssetImage("Logo_Stickers_2.jpg"),
    getAssetImage("Logo_Sticker_3.jpg")
  ],

  "Thank-you Stickers": [
    getAssetImage("Thankyou_Sticker_1.jpg"),
    getAssetImage("Thankyou_Sticker_2.jpg"),
    getAssetImage("Thankyou_Sticker_3.jpg")
  ],

  "Bottle Labels": [
    getAssetImage("Bottle_Labels_1.jpg"),
    getAssetImage("Bottle_Labels_2.jpg"),
    getAssetImage("Bottle_Labels_3.jpg")
  ],

  "Jar Labels": [
    getAssetImage("Jar_Label_1.jpg"),
    getAssetImage("Jar_Label_2.jpg"),
    getAssetImage("Jar_Label_3.jpg")
  ],

  "Food Labels": [
    getAssetImage("Food_Label_1.jpg"),
    getAssetImage("Food_Label_2.jpg"),
    getAssetImage("Food_Label_3.jpg")
  ],

  "Product Tags": [
    getAssetImage("Product_Tag_1.jpg"),
    getAssetImage("Product_Tag_2.webp"),
    getAssetImage("Product_Tags_3.jpg")
  ],

  "Hang Tags": [
    getAssetImage("Hang_Tags_1.jpg"),
    getAssetImage("Hang_Tags_2.jpg"),
    getAssetImage("Hang_Tags_3.jpg")
  ],

  "Clothing Tags": [
    getAssetImage("Clothing_Tags_1.jpg"),
    getAssetImage("Clothing_Tags_2.jpg"),
    getAssetImage("Clothing_Tags_3.jpg")
  ],

  "Price Tags": [
    getAssetImage("Price_Tags_1.jpg"),
    getAssetImage("Price_Tags_2.png"),
    getAssetImage("Price_Tags_3.jpg")
  ],

  "Jewellery Tags": [
    getAssetImage("Jewellary_Tags_1.jpg"),
    getAssetImage("Jewellary_Tags_2.jpg"),
    getAssetImage("Jewellary_Tags_3.jpg")
  ],

  "Paper Bags": [
    getAssetImage("Paper_Bag_1.jpg"),
    getAssetImage("Paper_Bag_2.webp"),
    getAssetImage("Paper_Bag_3.webp")
  ],

  "Packing Sleeves": [
    getAssetImage("Packing_Sleeve_1.jpg"),
    getAssetImage("Packing_Sleeve_2.jpg"),
    getAssetImage("Packing_Sleeve_3.jpg")
  ],

  "Product Boxes": [
    getAssetImage("Product_Box_1.jpg"),
    getAssetImage("Product_Box_2.jpg"),
    getAssetImage("Product_Box_3.jpg")
  ],

  "Gift Boxes": [
    getAssetImage("Gift_Box_1.jpg"),
    getAssetImage("Gift_Box_2.jpg"),
    getAssetImage("Gift_Box_3.jpg")
  ],

  "Food Boxes": [
    getAssetImage("Food_Box_1.jpg"),
    getAssetImage("Food_Box_2.jpg"),
    getAssetImage("Food_Box_3.jpg")
  ],

  "Cosmetic Boxes": [
    getAssetImage("Cosmetic_Box_1.jpg"),
    getAssetImage("Cosmetic_Box_2.jpg"),
    getAssetImage("Cosmetic_Box_3.jpg")
  ],

  "Retail Boxes": [
    getAssetImage("Retail_Box_1.jpg"),
    getAssetImage("Retail_Box_2.jpg"),
    getAssetImage("Retail_Box_3.jpg")
  ],

  "Shipping Boxes": [
    getAssetImage("Shipping_Box_1.jpg"),
    getAssetImage("Shipping_Box_2.jpg"),
    getAssetImage("Shipping_Box_3.jpg")
  ],

  "Welcome Boards": [
    getAssetImage("Welcome_Board_1.jpg"),
    getAssetImage("Welcome_Board_2.jpg"),
    getAssetImage("Welcome_Board_3.jpg")
  ],

  "Seating Charts": [
    getAssetImage("Seating_Chart_1.png"),
    getAssetImage("Seating_Chart_2.png"),
    getAssetImage("Seating_Chart_3.png")
  ],

  "Table Numbers": [
    getAssetImage("Table_Number_1.jpg"),
    getAssetImage("Table_Number_2.jpg"),
    getAssetImage("Table_Number_3.jpg")
  ],

  "Stage Banners": [
    getAssetImage("Stage_Banner_1.jpg"),
    getAssetImage("Stage_Banner_2.jpg"),
    getAssetImage("Stage_Banner_3.jpg")
  ],

  "Event Badges": [
    getAssetImage("Event_Badge_1.jpg"),
    getAssetImage("Event_Badge_2.jpg"),
    getAssetImage("Event_Badge_3.jpg")
  ],

  "Wristbands": [
    getAssetImage("Wrist_Band_1.jpg"),
    getAssetImage("Wrist_Band_2.jpg"),
    getAssetImage("Wrist_Band_3.jpg")
  ],

  "Personalised Mugs": [
    getAssetImage("Personalised_Mug_1.jpg"),
    getAssetImage("Personalised_Mug_2.jpg"),
    getAssetImage("Personalised_Mug_3.jpg")
  ],

  "Personalised Cushions": [
    getAssetImage("Personalised_Cushion_1.jpg"),
    getAssetImage("Personalised_Cushion_2.jpg"),
    getAssetImage("Personalised_Cushion_3.jpg")
  ],

  "Personalised Keychains": [
    getAssetImage("Personalised_Keychain_1.jpg"),
    getAssetImage("Personalised_Keychain_2.jpg"),
    getAssetImage("Personalised_Keychain_3.jpg")
  ],

  "Personalised Bottles": [
    getAssetImage("Personalised_Bottle_1.jpg"),
    getAssetImage("Personalised_Bottle_2.jpg"),
    getAssetImage("Personalised_Bottle_3.jpg")
  ],

  "Personalised Sippers": [
    getAssetImage("Personalised_Sipper_1.jpg"),
    getAssetImage("Personalised_Sipper_2.jpg"),
    getAssetImage("Personalised_Sipper_3.jpg")
  ],

  "Personalised Photo Gifts": [
    getAssetImage("Personalised_Photo_Gift_1.webp"),
    getAssetImage("Personalised_Photo_Gift_2.jpg"),
    getAssetImage("Personalised_Photo_Gift_3.jpg")
  ],

  "Personalised Notebooks": [],

  "Personalised Pens": [
    getAssetImage("Personalised_Pen_1.jpg"),
    getAssetImage("Personalised_Pen_2.jpg"),
    getAssetImage("Personalised_Pen_3.jpg")
  ]
};

/* ============================================================
   INDUSTRIES
   ============================================================ */

const industries = {
  Business: [
    "Corporate",
    "IT Companies",
    "Startups",
    "Offices",
    "Banks",
    "Insurance",
    "Real Estate",
    "Manufacturing"
  ],

  Institutions: [
    "Churches",
    "Schools",
    "Colleges",
    "Hospitals"
  ],

  Events: [
    "Weddings",
    "Engagements",
    "Birthdays",
    "Corporate Events",
    "Conferences",
    "Banquets"
  ],

  Hospitality: [
    "Restaurants",
    "Cafes",
    "Bakeries",
    "Hotels",
    "Banquet Halls"
  ],

  Retail: [
    "Clothing",
    "Electronics",
    "Supermarkets",
    "Pharmacies",
    "Gift Shops"
  ],

  Services: [
    "Salons",
    "Gyms",
    "Clinics",
    "Dentists",
    "Consultants",
    "Professional"
  ]
};

/* ============================================================
   INDUSTRY USE CASES
   ============================================================ */

const industryUseCases = {
  Corporate: [
    "Business stationery",
    "Employee ID cards",
    "Office signage",
    "Corporate merchandise",
    "Event collateral"
  ],

  "IT Companies": [
    "Team T-shirts",
    "Employee kits",
    "Office signs",
    "ID cards & lanyards",
    "Corporate gifts"
  ],

  Startups: [
    "Launch stationery",
    "Packaging",
    "Product labels",
    "Promotional kits",
    "Branded merchandise"
  ],

  Offices: [
    "Letterheads",
    "Envelopes",
    "Stamps",
    "Folders",
    "Certificates"
  ],

  Banks: [
    "Branch signage",
    "Promotional displays",
    "Employee cards",
    "Forms & stationery",
    "Corporate gifts"
  ],

  Insurance: [
    "Brochures",
    "Product sheets",
    "Promotional cards",
    "ID cards",
    "Event materials"
  ],

  "Real Estate": [
    "Property brochures",
    "Site boards",
    "Flyers",
    "Standee prints",
    "Direction signage"
  ],

  Manufacturing: [
    "Product labels",
    "Safety signage",
    "Packaging",
    "Employee IDs",
    "Corporate stationery"
  ],

  Churches: [
    "Event banners",
    "Certificates",
    "Invitation cards",
    "Ministry T-shirts",
    "Direction signage"
  ],

  Schools: [
    "ID cards",
    "Certificates",
    "Badges",
    "Event banners",
    "Notebooks"
  ],

  Colleges: [
    "Jerseys",
    "Hoodies",
    "Event badges",
    "Posters",
    "Certificates"
  ],

  Hospitals: [
    "Wayfinding signs",
    "Room signs",
    "ID cards",
    "Brochures",
    "Certificates"
  ],

  Weddings: [
    "Invitations",
    "Welcome boards",
    "Seating charts",
    "Table numbers",
    "Backdrops"
  ],

  Engagements: [
    "Invitations",
    "Welcome boards",
    "Name cards",
    "Backdrops",
    "Photo prints"
  ],

  Birthdays: [
    "Invitations",
    "Backdrops",
    "Welcome boards",
    "Table displays",
    "Personalised gifts"
  ],

  "Corporate Events": [
    "Badges",
    "Wristbands",
    "Backdrops",
    "Stage banners",
    "Certificates"
  ],

  Conferences: [
    "Badges",
    "Wristbands",
    "Backdrop graphics",
    "Directional signs",
    "Brochures"
  ],

  Banquets: [
    "Welcome boards",
    "Table numbers",
    "Menu cards",
    "Seating charts",
    "Backdrops"
  ],

  Restaurants: [
    "Menu cards",
    "Packaging stickers",
    "Paper bags",
    "Aprons",
    "Shop signage"
  ],

  Cafes: [
    "Menus",
    "Cup/bottle labels",
    "Packaging",
    "Table-top displays",
    "Staff apparel"
  ],

  Bakeries: [
    "Food labels",
    "Product boxes",
    "Thank-you stickers",
    "Paper bags",
    "Product tags"
  ],

  Hotels: [
    "Room signs",
    "Menus",
    "Event displays",
    "Guest materials",
    "Staff branding"
  ],

  "Banquet Halls": [
    "Welcome boards",
    "Direction signs",
    "Stage banners",
    "Table numbers",
    "Event signage"
  ],

  Clothing: [
    "Hang tags",
    "Product labels",
    "Paper bags",
    "T-shirts",
    "Promotional cards"
  ],

  Electronics: [
    "Product sheets",
    "Price lists",
    "Packaging labels",
    "Shop boards",
    "Promotional flyers"
  ],

  Supermarkets: [
    "Price cards",
    "Shelf/packaging labels",
    "Promotional flyers",
    "Banners",
    "Coupon cards"
  ],

  Pharmacies: [
    "Product labels",
    "Price lists",
    "Shop signage",
    "Promotional posters",
    "Bags"
  ],

  "Gift Shops": [
    "Product tags",
    "Gift boxes",
    "Paper bags",
    "Stickers",
    "Personalised gifts"
  ],

  Salons: [
    "Price lists",
    "Coupon cards",
    "Shop signage",
    "Staff apparel",
    "Business cards"
  ],

  Gyms: [
    "T-shirts",
    "Hoodies",
    "Bottles",
    "Membership cards",
    "Posters"
  ],

  Clinics: [
    "Business cards",
    "Letterheads",
    "Door plates",
    "Brochures",
    "Certificates"
  ],

  Dentists: [
    "Business cards",
    "Appointment materials",
    "Room signs",
    "Brochures",
    "Branded gifts"
  ],

  Consultants: [
    "Business cards",
    "Letterheads",
    "Presentation folders",
    "Notepads",
    "Corporate gifts"
  ],

  Professional: [
    "Business cards",
    "Letterheads",
    "Envelopes",
    "Stamps",
    "Office signage"
  ]
};

/* ============================================================
   EXPORTS
   ============================================================ */

export {
  productGroups,
  productMeta,
  productImages,
  getProductMeta,
  industries,
  industryUseCases
};