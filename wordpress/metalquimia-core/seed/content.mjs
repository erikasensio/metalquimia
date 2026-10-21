/**
 * Contenido inicial de la web, sacado del Figma (textos en inglés tal cual y su traducción al español).
 * `node wordpress/metalquimia-core/seed/build.mjs` genera site.json, que usan:
 *   - el plugin (Herramientas → Contenido inicial, o `wp mq seed`) para crear páginas, menús y ajustes;
 *   - el front en modo WP_URL=mock para maquetar sin WordPress.
 *
 * L(es, en) marca un texto traducible. "@img:clave" es una imagen de seed/images, "@page:clave" un enlace a otra página.
 * Las imágenes viven en la biblioteca de medios de WordPress (opción mq_seed_images: clave → adjunto); seed/images no se versiona
 * y solo hace falta en local para subir una imagen nueva la primera vez.
 */

export const L = (es, en) => ({ __l: true, es, en: en ?? es });
export const images = {};
/** Registra un hueco de imagen: archivo en seed/images, texto alternativo y descripción para buscarla. */
const img = (key, file, altEs, altEn, find) => {
  images[key] = { file, alt: { es: altEs, en: altEn ?? altEs }, find };
  return `@img:${key}`;
};
const link = (title, url, target = "") => ({ title, url, target });

// ---------- Imágenes ----------
const I = {
  heroHomePoster: img("hero-home-poster", "hero-home-poster.jpg", "Línea de procesado Metalquimia en una nave industrial", "Metalquimia processing line in an industrial hall", "First frame of the home hero video"),
  heroHomeVideo: img("hero-home-video", "hero-home.mp4", "Recorrido por una planta de procesado Metalquimia", "Walkthrough of a Metalquimia processing plant", "Video: camera travelling through a bright stainless steel meat processing plant"),
  heroHome: img("hero-home", "hero-home.jpg", "Planta de procesado de carne Metalquimia", "Metalquimia meat processing plant", "Dark, wide industrial meat-processing hall with stainless steel machines, cinematic, bottom dark"),
  tunnel: img("tunnel", "tunnel.jpg", "Interior de un tambor de acero inoxidable", "Inside a stainless steel tumbler drum", "Inside of a stainless steel drum/tunnel, metallic reflections, dark"),
  machineHero: img("machine-hero", "machine-hero.jpg", "Inyectora Movistick en la planta", "Movistick injector in the plant", "Large stainless steel industrial meat injector machine in a dark showroom"),
  machineLine: img("machine-line", "machine-line.png", "Línea de máquinas Metalquimia", "Metalquimia machine line", "Cut-out PNG of a stainless steel meat processing machine line on transparent background"),
  building: img("building", "building.jpg", "Sede de Metalquimia en Girona", "Metalquimia headquarters in Girona", "Modern industrial headquarters building facade with red logo, sky"),
  hqHouse: img("hq-house", "hq-house.jpg", "Sede social de Metalquimia", "Metalquimia registered office", "Old stone villa office building with tiled roof among trees, aerial"),
  meatCenter: img("meat-center", "meat-center.jpg", "Centro tecnológico de la carne", "Meat technology center", "Small modern office building next to parking"),
  workshop: img("workshop", "workshop.jpg", "Taller de montaje de maquinaria", "Machinery assembly workshop", "Industrial warehouse with blue and white walls, aerial"),
  production: img("production", "production.jpg", "Instalaciones de producción", "Production facilities", "Aerial view of industrial production buildings with trees"),
  newWorkshop: img("new-workshop", "new-workshop.jpg", "Nuevo taller de montaje", "New assembly workshop", "New grey industrial building exterior"),
  lab: img("lab", "lab.jpg", "Laboratorio de I+D", "R&D laboratory", "Food technologist in lab coat examining meat samples in laboratory"),
  facilitiesHero: img("facilities-hero", "facilities-hero.jpg", "Edificio de la sede de Metalquimia", "Metalquimia headquarters building", "Beige three-storey office building with a man walking in, Facilities hero"),
  pilot: img("pilot", "pilot.jpg", "Planta piloto", "Pilot plant", "Pilot plant with stainless steel food processing equipment"),
  training: img("training", "training.jpg", "Formación técnica", "Technical training", "Engineer presenting to people in a meeting room"),
  engineer: img("engineer", "engineer.jpg", "Ingeniero trabajando en una pantalla de control", "Engineer working on a control screen", "Engineer in white coat operating touch screen control panel of industrial machine"),
  touch: img("touch", "touch.jpg", "Panel táctil de una inyectora", "Injector touch panel", "Close-up finger pressing black touch button on stainless machine, dark"),
  software: img("software", "software.jpg", "Software de control MQConnect", "MQConnect control software", "Woman looking at computer screens with 3D CAD/data visualisation"),
  partner: img("partner", "partner.jpg", "Josep Lagares junto a una máquina Metalquimia", "Josep Lagares next to a Metalquimia machine", "Senior man in suit standing in front of industrial machine in factory"),
  team: img("team", "team.jpg", "Equipo directivo de Metalquimia", "Metalquimia leadership team", "Three senior business people standing together, office"),
  meeting: img("meeting", "meeting.jpg", "Reunión en la oficina", "Office meeting", "Business people talking around a table in bright office"),
  yellowRing: img("yellow-ring", "yellow-ring.jpg", "Ingeniero con una pieza de inyectora", "Engineer holding an injector part", "Dramatic black and white portrait of engineer holding a metal ring, yellow accent"),
  factory: img("factory", "factory.jpg", "Operario en la planta", "Operator in the plant", "Worker in white hygiene suit in a food factory with stainless silos"),
  silo: img("silo", "silo.jpg", "Instalación industrial de acero inoxidable", "Stainless steel installation", "Stainless steel silos and pipes in food factory"),
  waves: img("waves", "waves.jpg", "Detalle abstracto de acero", "Abstract steel detail", "Abstract dark wave pattern metallic texture"),
  // Tecnologías propias (Figma Páginas › Tecnologías propias 307:11299). Recortadas al encuadre del Figma (601 × 650).
  techHero: img("tech-hero", "tech-hero.webp", "Técnico revisando el interior de un bombo de masaje", "Technician checking the inside of a tumbler drum", "Man in lab coat and hairnet looking into a large stainless steel tumbler drum"),
  techConsulting: img("tech-consulting", "tech-consulting.webp", "Ingeniera revisando un diseño 3D en pantalla", "Engineer reviewing a 3D design on screen", "Woman looking at two monitors with 3D CAD of a processing line"),
  techPilot: img("tech-pilot", "tech-pilot.webp", "Técnica revisando producto en la planta piloto", "Technician checking product in the pilot plant", "Woman in lab coat and blue gloves holding meat snack on a conveyor"),
  techTurnkey: img("tech-turnkey", "tech-turnkey.webp", "Ingenieros revisando planos de una planta", "Engineers reviewing plant drawings", "Two engineers pointing at 3D plant renders on a wall"),
  techLabs: img("tech-labs", "tech-labs.webp", "Laboratorio de análisis de Metalquimia", "Metalquimia testing laboratory", "Bright laboratory with three technicians in lab coats at white benches"),
  techAdditives: img("tech-additives", "tech-additives.webp", "Técnica inyectando salmuera en una pieza de carne", "Technician injecting brine into a piece of meat", "Gloved hands injecting a piece of meat with a syringe, pink background"),
  techBibliography: img("tech-bibliography", "tech-bibliography.webp", "Biblioteca técnica de Metalquimia", "Metalquimia technical library", "Library shelves full of magazines and blue binders"),
  map: img("map", "map.jpg", "Mapa", "Map", "unused"),
  ham: img("ham", "ham.png", "Jamón cocido", "Cooked ham", "Cut-out PNG cooked ham with slices, transparent background"),
  // Fotogramas del vídeo de las lonchas separándose (fondo transparente): el scroll pasa de uno a otro.
  hamFrames: Array.from({ length: 49 }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return img(`ham-frame-${n}`, `ham-frame-${n}.webp`, "Lonchas de jamón cocido", "Cooked ham slices", "Video frame of cooked ham slices stacking, transparent");
  }),
  hamSlices: img("ham-slices", "ham-slices.webp", "Lonchas de jamón cocido", "Cooked ham slices", "Cut-out floating slices of cooked ham, transparent (Figma División › Hightlights)"),
  turkey: img("turkey", "turkey.png", "Pechuga de pavo", "Turkey breast", "Cut-out PNG cooked turkey breast, transparent"),
  bacon: img("bacon", "bacon.png", "Bacon", "Bacon", "Cut-out PNG bacon strips, transparent"),
  salami: img("salami", "salami.png", "Salami curado en lonchas", "Sliced cured salami", "Cut-out PNG stack of salami slices, transparent"),
  chorizo: img("chorizo", "chorizo.png", "Chorizo curado", "Cured chorizo", "Cut-out PNG cured chorizo, transparent"),
  marinated: img("marinated", "marinated.png", "Carne marinada", "Marinated meat", "Cut-out PNG marinated pork loin/ribs, transparent"),
  chicken: img("chicken", "chicken.png", "Pollo marinado", "Marinated chicken", "Cut-out PNG marinated chicken pieces, transparent"),
  snacks: img("snacks", "snacks.png", "Snacks cárnicos", "Meat snacks", "Cut-out PNG meat snack sticks / jerky, transparent"),
  sausages: img("sausages", "sausages.png", "Salchichas", "Sausages", "Cut-out PNG sausages, transparent"),
  petfood: img("petfood", "petfood.png", "Snacks para mascotas", "Pet treats", "Cut-out PNG dog treats/dental sticks, transparent"),
  salmon: img("salmon", "salmon.png", "Salmón marinado", "Marinated salmon", "Cut-out PNG salmon fillet, transparent"),
  // Engineering Mindset (Figma Páginas › Engineering Mindset 307:10166). Las tarjetas ya llevan el fondo blanco y la imagen colocada.
  engineeringHero: img("engineering-hero", "engineering-hero.jpg", "Soldador dentro de un tambor de acero inoxidable", "Welder inside a stainless steel drum", "Welder working inside a polished stainless steel drum, tunnel perspective"),
  engineeringTurnkey: img("engineering-turnkey", "engineering-turnkey.jpg", "Técnico con un portátil junto a una máquina Metalquimia", "Technician with a laptop next to a Metalquimia machine", "Man in black t-shirt with laptop next to a stainless Metalquimia machine"),
  diffGlobal: img("engineering-difference-global", "engineering-difference-global.jpg", "Mapa con la presencia de Metalquimia en el mundo", "Map of Metalquimia's presence worldwide", "Card 477x540: light grey world map with red dots, white background"),
  diffTailored: img("engineering-difference-tailored", "engineering-difference-tailored.jpg", "Operario frente a un almacén vertical automático", "Operator in front of an automated vertical storage system", "Card 477x540: photo of an operator at a Kardex unit, white fade on top"),
  diffLines: img("engineering-difference-lines", "engineering-difference-lines.jpg", "Línea de procesado completa Metalquimia", "Complete Metalquimia processing line", "Card 477x540: render of a stainless processing line on dark gradient"),
  // Detalle de caso de éxito / insight (Figma 459:24823).
  caseHero: img("case-hero", "case-hero.jpg", "Técnica manejando la pantalla de una inyectora en el laboratorio", "Technician operating an injector screen in the lab", "Technician in white coat and hairnet at an injector touch screen in a white lab (Figma Detalle de casos de éxito)"),
  caseRing: img("case-ring", "case-ring.jpg", "Ingeniero mirando a través de un aro metálico", "Engineer looking through a metal ring", "Backlit engineer looking through a golden ring (Figma Detalle de casos de éxito)"),
  caseMachines: img("case-machines", "case-machines.jpg", "Línea de máquinas Metalquimia de acero inoxidable", "Line of stainless steel Metalquimia machines", "Injector, tumbler and lifter in a grey studio (Figma Detalle de casos de éxito)"),
  // Recortes de la página Soluciones (Figma Páginas › Soluciones).
  menuCooked: img("menu-cooked", "menu-cooked.png", "Lonchas de jamón cocido", "Cooked ham slices", "Cut-out PNG of floating cooked ham slices (Figma Menús, Productos)"),
  solutionCooked: img("solution-cooked", "solution-cooked.png", "Jamón cocido con lonchas", "Cooked ham with slices", "Cut-out PNG cooked ham with floating slices (Figma Soluciones)"),
  solutionMarinated: img("solution-marinated", "solution-marinated.png", "Pieza de carne marinada", "Marinated meat piece", "Cut-out PNG marinated pork piece with slices (Figma Soluciones)"),
  solutionCured: img("solution-cured", "solution-cured.png", "Lonchas de embutido curado", "Cured sausage slices", "Cut-out PNG stack of salami slices (Figma Soluciones)"),
  solutionSnacks: img("solution-snacks", "solution-snacks.png", "Tiras de bacon", "Bacon strips", "Cut-out PNG floating bacon strips (Figma Soluciones)"),
  solutionSausages: img("solution-sausages", "solution-sausages.png", "Salchichas", "Sausages", "Cut-out PNG frankfurter sausages (Figma Soluciones)"),
  solutionPetfood: img("solution-petfood", "solution-petfood.png", "Snacks para mascotas", "Pet treats", "Cut-out PNG stacked pet food treats (Figma Soluciones)"),
  // Página Cocidos (Figma Páginas › División 177:735).
  cookedProducts: [
    ["Costilla de vacuno marinada envasada al vacío", "Vacuum-packed marinated beef rib"],
    ["Bloque de carne congelada", "Frozen meat block"],
    ["Jamón cocido con lonchas", "Cooked ham with slices"],
    ["Lonchas de jamón cocido y pieza redonda", "Cooked ham slices and round ham"],
    ["Tiras de bacon", "Bacon strips"],
    ["Chuletón envasado al vacío", "Vacuum-packed rib steak"],
    ["Salchichas cocidas", "Cooked sausages"],
  ].map(([es, en], i) => img(`cooked-product-${i + 1}`, `cooked-product-${i + 1}.webp`, es, en, "Cut-out product, transparent (Figma División › hero-division)")),
  cookedSteps: [
    ["Operario ajustando una línea de preparación de salmuera", "Operator adjusting a brine preparation line"],
    ["Agujas de una inyectora multiaguja", "Needles of a multi-needle injector"],
    ["Interior de un bombo de masaje de acero inoxidable", "Inside a stainless steel tumbling drum"],
    ["Técnica trabajando en una línea de cocción", "Technician working on a cooking line"],
    ["Pantalla táctil de MQConnect en una máquina", "MQConnect touch screen on a machine"],
  ].map(([es, en], i) => img(`cooked-step-${i + 1}`, `cooked-step-${i + 1}.jpg`, es, en, "Process photo (Figma División › steps-carousel)")),
  cookedPlates: [
    ["Jamón cocido de músculo entero con lonchas en un plato", "Whole muscle cooked ham with slices on a plate"],
    ["Plato de lonchas de jamón cocido", "Plate of cooked ham slices"],
    ["Bloques de fiambre cocido", "Cooked meat logs"],
    ["Jamón cocido y lonchas en un plato", "Cooked ham and slices on a plate"],
    ["Paleta cocida y lonchas en un plato", "Cooked shoulder and slices on a plate"],
  ].map(([es, en], i) => img(`cooked-plate-${i + 1}`, `cooked-plate-${i + 1}.jpg`, es, en, "Food photo on white (Figma División › highlight-carousel)")),
  machineDefroster: img("machine-defroster", "machine-defroster.webp", "Descongeladora de bloques de carne", "Meat block defroster", "Cut-out stainless machine on transparent (Figma División › product-highlight)"),
  machineTumbler: img("machine-tumbler", "machine-tumbler.webp", "Bombo de masaje al vacío", "Vacuum tumbler", "Cut-out stainless tumbler on transparent (Figma División › product-highlight)"),
  machineInjector: img("machine-injector", "machine-injector.webp", "Inyectora de salmuera", "Brine injector", "Cut-out stainless injector on transparent (Figma División › product-highlight)"),
  // Página Inyección de carne (Figma Páginas › 443:16228 › product-highlight). Signature Edition y Movimax Zero usan la misma foto en el Figma.
  movistickClassic: img("machine-movistick-classic", "machine-movistick-classic.webp", "Inyectora Movistick Classic", "Movistick Classic injector", "Cut-out PNG Movistick Classic injector, transparent"),
  movistickTriplex: img("movistick-triplex", "movistick-triplex.png", "Inyectora Movistick Triplex", "Movistick Triplex injector", "Cut-out PNG Movistick Triplex injector, transparent"),
  // Todas las máquinas en un lienzo 1200 × 896 con el mismo encuadre que la Triplex del Figma (así salen del mismo tamaño en
  // el hero). Moviplus: fotos de metalquimia.com con el fondo blanco recortado (las del Figma eran provisionales).
  moviplusSignature: img("machine-moviplus-signature-v2", "machine-moviplus-signature-v2.webp", "Inyectora Moviplus 4.0 Signature Edition", "Moviplus 4.0 Signature Edition injector", "Cut-out Moviplus 4.0 Signature Edition injector, transparent (metalquimia.com)"),
  moviplus40: img("machine-moviplus-40-v2", "machine-moviplus-40-v2.webp", "Inyectora Moviplus 4.0", "Moviplus 4.0 injector", "Cut-out Moviplus 4.0 injector, transparent (metalquimia.com)"),
  moviplusE: img("machine-moviplus-e-v2", "machine-moviplus-e-v2.webp", "Inyectora Moviplus-E", "Moviplus-E injector", "Cut-out Moviplus-e 120/4500 CR injector, transparent (metalquimia.com)"),
  movimaxZero: img("machine-movimax-zero", "machine-movimax-zero.webp", "Inyectora Movimax Zero", "Movimax Zero injector", "Cut-out PNG Movimax Zero injector, transparent"),
  // Página MQ Innovation Center (Figma Páginas › 307:12454). Aguja y robot recortados al encuadre del Figma.
  innovationDrum: img("innovation-drum", "innovation-drum.jpg", "Operario dentro de un tambor de acero inoxidable", "Operator inside a stainless steel drum", "Worker in blue inside a shiny stainless steel drum (Figma MQ Innovation Center › two-column-img)"),
  innovationHeads: img("innovation-injector-heads", "innovation-injector-heads.jpg", "Detalle de los cabezales de una inyectora", "Close-up of injector heads", "Close-up of stainless steel injector cylinders (Figma MQ Innovation Center › two-column-img)"),
  innovationNeedles: img("innovation-needles", "innovation-needles.jpg", "Agujas de una inyectora sobre base azul", "Injector needles over a blue base", "Rows of stainless needles over blue plate (Figma MQ Innovation Center › media-text)"),
  innovationLine: img("innovation-line", "innovation-line.jpg", "Línea de inyección y masaje Metalquimia", "Metalquimia injection and tumbling line", "Render of stainless machine line on grey gradient (Figma MQ Innovation Center › highlight-carousel)"),
  innovationRobot: img("innovation-robot", "innovation-robot.jpg", "Robot industrial en una sala blanca", "Industrial robot in a white room", "White industrial robot with blue base in white room (Figma MQ Innovation Center › highlight-carousel)"),
  // Servicios (Figma Páginas › Services 591:25140). Recortadas al encuadre del Figma (601 × 650; la del hero, a sangre).
  servicesHero: img("services-hero", "services-hero.jpg", "Línea de máquinas Metalquimia sobre fondo gris", "Metalquimia machine line on a grey background", "Render of stainless machine line (tumbler, injector, loader) on grey gradient, wide (Figma Services › hero-secondary)"),
  servicesConsulting: img("services-consulting", "services-consulting.webp", "Ingeniera revisando un diseño 3D en pantalla", "Engineer reviewing a 3D design on screen", "Woman with hand on chin looking at two monitors with 3D CAD of a processing line"),
  servicesParts: img("services-parts", "services-parts.webp", "Técnico cambiando una pieza de una máquina", "Technician replacing a machine part", "Hands fitting a stainless part with blue seal into a machine hopper"),
  servicesTraining: img("services-training", "services-training.webp", "Operario usando la pantalla táctil de una Moviplus", "Operator using a Moviplus touch screen", "Man pressing the touch screen control panel of a Metalquimia Signature machine"),
  servicesTurnkey: img("services-turnkey", "services-turnkey.webp", "Línea de producción con cinta azul", "Production line with a blue conveyor", "Row of stainless tumblers above a blue conveyor belt in a plant"),
  servicesUpgrade: img("services-upgrade", "services-upgrade.webp", "Técnico modernizando una máquina", "Technician upgrading a machine", "Man in black shirt working on the wiring of an industrial machine with a blue motor"),
  productIntro: img("product-intro-engineering","product-intro-engineering.webp", "Ingeniera revisando un diseño en CAD", "Engineer reviewing a CAD design", "Woman at two monitors with 3D CAD of machine parts (Figma Página de máquina › feature-highlight)"),
  // Página Marinados (Figma Páginas › División 325:5629).
  marinatedProducts: [
    ["Pechuga de pollo marinada", "Marinated chicken breast"],
    ["Chuletón marinado con especias", "Spiced marinated rib-eye steak"],
    ["Lomos de salmón y pescado blanco marinados", "Marinated salmon and white fish fillets"],
  ].map(([es, en], i) => img(`marinated-product-${i + 1}`, `marinated-product-${i + 1}.webp`, es, en, "Cut-out product, transparent (Figma División Marinated › hero-division)")),
  marinatedSteps: [
    ["Técnico ajustando una pieza circular a contraluz", "Technician adjusting a circular part against the light"],
    ["Inyectora Movimax Zero", "Movimax Zero injector"],
    ["Robot industrial en una sala blanca", "Industrial robot in a clean room"],
    ["Servomotor de una máquina Metalquimia", "Servo motor of a Metalquimia machine"],
    ["Técnica revisando un armario de control", "Technician checking a control cabinet"],
  ].map(([es, en], i) => img(`marinated-step-${i + 1}`, `marinated-step-${i + 1}.jpg`, es, en, "Process photo (Figma División Marinated › steps-carousel)")),
  marinatedPlates: [
    ["Muslos de pollo marinados con patatas", "Marinated chicken drumsticks with potatoes"],
    ["Plato de salmón marinado", "Plate of marinated salmon"],
    ["Rosbif marinado en lonchas", "Sliced marinated roast beef"],
  ].map(([es, en], i) => img(`marinated-plate-${i + 1}`, `marinated-plate-${i + 1}.jpg`, es, en, "Food photo on white (Figma División Marinated › highlight-carousel)")),
  marinatedHighlight: img("marinated-highlight", "marinated-highlight.webp", "Lomos de salmón y pescado blanco marinados", "Marinated salmon and white fish fillets", "Cut-out marinated fish, transparent (Figma División Marinated › Hightlights)"),
  curedProducts: [
    ["Lonchas de chorizo curado", "Cured chorizo slices"],
    ["Dados de jamón curado", "Cured ham cubes"],
    ["Lonchas de salchichón", "Salchichón slices"],
    ["Lonchas de salami a la pimienta", "Peppered salami slices"],
    ["Lonchas de salami", "Salami slices"],
  ].map(([es, en], i) => img(`cured-product-${i + 1}`, `cured-product-${i + 1}.webp`, es, en, "Cut-out product, transparent (Figma División Cured › hero-division)")),
  curedHighlight: img("cured-highlight", "cured-highlight.webp", "Lonchas de chorizo curado flotando", "Floating cured chorizo slices", "Cut-out floating chorizo slices, transparent (Figma División Cured › Hightlights)"),
  // Página Snacks (Figma Páginas › División 325:7403).
  snacksProducts: [
    ["Chips verdes de proteína", "Green protein chips"],
    ["Palitos de carne curada", "Cured meat sticks"],
    ["Chips de carne crujientes", "Crispy meat chips"],
  ].map(([es, en], i) => img(`snacks-product-${i + 1}`, `snacks-product-${i + 1}.webp`, es, en, "Cut-out product, transparent (Figma División Snacks › hero-division)")),
  snacksSteps: [
    ["Técnico ajustando una pieza circular a contraluz", "Technician adjusting a circular part against the light"],
    ["Loncheadora QDS de Metalquimia", "Metalquimia QDS slicer"],
    ["Robot de procesado en una sala blanca", "Processing robot in a clean room"],
    ["Motor de una máquina sobre fondo negro", "Machine motor on a black background"],
    ["Técnica revisando un armario de control", "Technician checking a control cabinet"],
  ].map(([es, en], i) => img(`snacks-step-${i + 1}`, `snacks-step-${i + 1}.jpg`, es, en, "Process photo (Figma División Snacks › steps-carousel)")),
  sausagesProducts: [img("sausages-product-1", "sausages-product-1.webp", "Salchichas cocidas", "Cooked sausages", "Cut-out sausages, transparent (Figma División Sausages › hero-division)")],
  sausagesSteps: [
    ["Técnico ajustando una pieza circular a contraluz", "Technician adjusting a circular part against the light"],
    ["Motor de accionamiento de una máquina Metalquimia", "Drive motor of a Metalquimia machine"],
    ["Robot industrial en una sala blanca", "Industrial robot in a clean room"],
    ["Motor de accionamiento sobre fondo negro", "Drive motor on a black background"],
    ["Técnica revisando un armario de control", "Technician checking a control cabinet"],
  ].map(([es, en], i) => img(`sausages-step-${i + 1}`, `sausages-step-${i + 1}.jpg`, es, en, "Process photo (Figma División Sausages › steps-carousel)")),
  sausagesHighlight: img("sausages-highlight", "sausages-highlight.webp", "Salchichas cocidas flotando", "Floating cooked sausages", "Cut-out sausages, transparent (Figma División Sausages › Hightlights)"),
  // Página Pet food (Figma Páginas › División 558:25933).
  // Único recorte del hero (y el mismo de "Meat. The Next."); en el Figma solo está a 342 × 504 px.
  petfoodProducts: [img("petfood-product-1", "petfood-product-1.webp", "Snacks para mascotas apilados", "Stacked pet treats", "Cut-out stacked pet biscuits, transparent (Figma División Pet food › hero)")],
  petfoodPlates: [
    ["Tiras de carne tipo jerky sobre una tabla", "Jerky-style meat strips on a board"],
    ["Chips de pescado sobre una tabla", "Fish chips on a board"],
    ["Chips crujientes de carne", "Crispy meat chips"],
  ].map(([es, en], i) => img(`petfood-plate-${i + 1}`, `petfood-plate-${i + 1}.jpg`, es, en, "Snack photo on stone board (Figma División Pet food › highlight-carousel)")),
  plate1: img("plate-1", "plate-1.jpg", "Lonchas de jamón cocido en un plato", "Cooked ham slices on a plate", "Overhead plate with cooked ham slices on linen"),
  plate2: img("plate-2", "plate-2.jpg", "Pechuga de pavo loncheada", "Sliced turkey breast", "Sliced turkey/ham on a plate, soft light"),
  plate3: img("plate-3", "plate-3.jpg", "Mortadela en bloque", "Mortadella block", "Pink mortadella/ham blocks on white"),
  plate4: img("plate-4", "plate-4.jpg", "Pollo marinado a la parrilla", "Grilled marinated chicken", "Grilled marinated chicken on plate"),
  plate5: img("plate-5", "plate-5.jpg", "Salmón ahumado", "Smoked salmon", "Smoked salmon slices on board"),
  step1: img("step-1", "step-1.jpg", "Preparación de salmuera", "Brine preparation", "Operator in white suit next to stainless mixing tank"),
  step2: img("step-2", "step-2.jpg", "Inyección", "Injection", "Close-up of needles of meat injector, stainless"),
  step3: img("step-3", "step-3.jpg", "Masaje", "Tumbling", "Inside of stainless tumbler with paddles"),
  step4: img("step-4", "step-4.jpg", "Cocción", "Cooking", "Industrial cooking ovens in food factory"),
  step5: img("step-5", "step-5.jpg", "Loncheado", "Slicing", "Industrial slicer cutting ham"),
  m1: img("m-1", "m-1.png", "Inyectora Movistick", "Movistick injector", "Cut-out PNG stainless steel meat injector machine, transparent"),
  m2: img("m-2", "m-2.png", "Masajeadora", "Tumbler", "Cut-out PNG stainless steel vacuum tumbler drum, transparent"),
  m3: img("m-3", "m-3.png", "Embutidora", "Stuffer", "Cut-out PNG stainless steel stuffing/filling machine, transparent"),
  m4: img("m-4", "m-4.png", "Tenderizadora", "Tenderizer", "Cut-out PNG compact stainless steel tenderizer machine, transparent"),
  thumb: img("product-thumb", "product-thumb.jpg", "Movistick Tinder", "Movistick Tinder", "Small photo of stainless injector machine"),
  insight1: img("insight-1", "insight-1.jpg", "Técnico de laboratorio", "Lab technician", "Scientist in lab coat and glasses holding sample"),
  insight2: img("insight-2", "insight-2.jpg", "Jamón loncheado en envase", "Packaged sliced ham", "Sliced ham packaging close up"),
  insight3: img("insight-3", "insight-3.jpg", "Planta de producción de alimentos", "Food production plant", "Rows of meat products hanging in factory"),
  insight4: img("insight-4", "insight-4.jpg", "Revista Metalquimia", "Metalquimia magazine", "Magazine cover on dark table, red accents"),
  award1: img("award-1", "award-1.jpg", "Entrega de premios", "Award ceremony", "People on stage receiving an industry award"),
  award2: img("award-2", "award-2.jpg", "Premio a la innovación", "Innovation award", "Industry award trophy and poster"),
  p1: img("person-1", "person-1.jpg", "Retrato de directivo", "Executive portrait", "Portrait of senior executive man, grey background"),
  p2: img("person-2", "person-2.jpg", "Retrato de directivo", "Executive portrait", "Portrait of executive man with beard, grey background"),
  p3: img("person-3", "person-3.jpg", "Retrato de directiva", "Executive portrait", "Portrait of executive woman, grey background"),
  p4: img("person-4", "person-4.jpg", "Retrato de directivo", "Executive portrait", "Portrait of young executive man, grey background"),
  h1: img("history-1", "history-1.jpg", "Primer taller", "First workshop", "Black and white vintage photo of small workshop"),
  h2: img("history-2", "history-2.jpg", "Primera inyectora", "First injector", "Vintage industrial machine photo"),
  h3: img("history-3", "history-3.jpg", "Expansión internacional", "International expansion", "Trade fair stand 1990s"),
  h4: img("history-4", "history-4.jpg", "Nueva sede", "New headquarters", "Modern industrial building"),
  repRuampat: img("rep-ruampat", "rep-ruampat.png", "Logo de Ruampat", "Ruampat logo", "Representative logo 64x64 (Figma Representatives 758:22906)"),
  logoA: img("logo-a", "logo-a.png", "Bombieri", "Bombieri", "Client logo PNG transparent (Figma)"),
  logoB: img("logo-b", "logo-b.png", "Casa Tarradellas", "Casa Tarradellas", "Client logo PNG transparent (Figma)"),
  logoC: img("logo-c", "logo-c.png", "Sigma", "Sigma", "Client logo PNG transparent (Figma)"),
  logoD: img("logo-d", "logo-d.png", "Grandi Salumifici Italiani", "Grandi Salumifici Italiani", "Client logo PNG transparent (Figma)"),
  logoE: img("logo-e", "logo-e.png", "Plumrose", "Plumrose", "Client logo PNG transparent (Figma)"),
  logoF: img("logo-f", "logo-f.png", "Noel", "Noel", "Client logo PNG transparent (Figma)"),
  logoG: img("logo-g", "logo-g.png", "Fiorucci", "Fiorucci", "Client logo PNG transparent (Figma)"),
  logoH: img("logo-h", "logo-h.png", "Kiener", "Kiener", "Client logo PNG transparent (Figma)"),
  logoI: img("logo-i", "logo-i.png", "Guaraní", "Guaraní", "Client logo PNG transparent (Figma)"),
  highlightMachine: img("highlight-machine", "highlight-machine.jpg", "Embutidora Metalquimia", "Metalquimia stuffer", "Copper and steel stuffing machine on pure black background (Figma Home \"Hightlights\")"),
  methodCard1: img("method-1", "method-1.jpg", "Engineering Mindset", "Engineering Mindset", "Man in suit in front of industrial robots, blue light"),
  // Iconos del menú Productos (Figma "Menús" 397:40875): PNG transparente de 96 × 96 px, se ven a 24 px.
  menuIcons: Object.fromEntries(
    [
      ["thawing", "Descongelación", "Thawing"],
      ["brine", "Salmuera", "Brine"],
      ["injection", "Inyección", "Injection"],
      ["marinating", "Marinado", "Marinating"],
      ["tenderization", "Tenderización", "Tenderization"],
      ["massage", "Masaje", "Massage"],
      ["stuffing", "Embutición", "Stuffing"],
      ["cooking", "Cocción", "Cooking"],
      ["cooking-plants", "Plantas de cocción", "Cooking plants"],
      ["sliced", "Loncheados", "Sliced meats"],
      ["sausages", "Salchichas", "Sausages"],
      ["petfood", "Pet food", "Pet food"],
    ].map(([key, es, en]) => [key, img(`menu-icon-${key}`, `menu-icon-${key}.png`, "", "", `Line icon: ${en} (${es}), Figma Menús`)]),
  ),
  methodCard2: img("method-2", "method-2.jpg", "Tecnologías propias", "Proprietary technologies", "Large stainless machine in grey showroom"),
  // Página Partnership (Figma Páginas › Industry 307:14786).
  partnershipHero: img("partnership-hero", "partnership-hero.jpg", "Operaria en el panel táctil de una línea Metalquimia", "Operator at the touch panel of a Metalquimia line", "Operator in hairnet at touch screen of large stainless hopper machine (Figma Industry › hero-secondary)"),
  partnershipSolution: img("partnership-solution", "partnership-solution.jpg", "Operario dentro de un tambor de acero inoxidable", "Worker inside a stainless steel drum", "Worker in blue inside a big stainless tumbler drum on a stand, vertical (Figma Industry › media-text)"),
  partnershipSteps: [
    ["partnership-step-1.jpg", "Ingeniero con una pieza circular", "Engineer holding a circular part", "Backlit man touching a golden ring"],
    ["partnership-step-3.jpg", "Robot industrial en una sala blanca", "Industrial robot in a white room", "Big white robot arm over blue conveyor in white room"],
    ["partnership-step-4.jpg", "Motor de una máquina Metalquimia", "Metalquimia machine motor", "Orange-lit servo motor cut-out on black"],
    ["partnership-step-5.jpg", "Técnica revisando un cuadro de control", "Technician checking a control cabinet", "Woman in blue workwear at an electrical cabinet"],
  ].map(([file, es, en, find]) => img(file.replace(".jpg", ""), file, es, en, `${find} (Figma Industry › steps-carousel)`)),
  // Página About us (Figma Páginas › About us 752:20648).
  aboutHq: img("about-hq", "about-hq.webp", "Sede de Metalquimia en Girona", "Metalquimia headquarters in Girona", "Grey industrial building facade with orange Metalquimia logo, blue sky (Figma About › hero-secondary)"),
  aboutTeam: img("about-team", "about-team.webp", "La familia Lagares, al frente de Metalquimia", "The Lagares family, at the head of Metalquimia", "Three senior men in navy suits, one seated, grey backdrop (Figma About › media-text)"),
  aboutValues: [
    ["about-creativation.webp", "Charla Creativation Talks", "Creativation Talks", "Speaker on a stage in front of the orange «creativationtalks» sign"],
    ["about-culture.webp", "Laboratorio de I+D de Metalquimia", "Metalquimia R&D laboratory", "Technicians in lab coats around a white lab bench"],
    ["about-ethics.webp", "Reunión en un despacho de Metalquimia", "Meeting in a Metalquimia office", "Man in suit talking at a wooden table with two people, world map behind"],
    ["about-foundation.webp", "Logotipo de la Fundació Metalquimia", "Fundació Metalquimia logo", "Fundació Metalquimia logo on white"],
  ].map(([file, es, en, find]) => img(file.replace(".webp", ""), file, es, en, `${find} (Figma About › steps-slider)`)),
  aboutPeople: [
    ["about-narcis-lagares-corominas.webp", "Narcís Lagares Corominas", "Older man with glasses in navy blazer, seated"],
    ["about-josep-lagares.webp", "Josep Lagares Gamero", "Bald man in navy blazer, grey backdrop"],
    ["about-narcis-lagares-gamero.webp", "Narcís Lagares Gamero", "Man with glasses and grey beard in navy blazer"],
    ["about-llorenc-freixanet.webp", "Llorenç Freixanet Garriga", "Smiling man with glasses in navy polo"],
  ].map(([file, name, find]) => img(file.replace(".webp", ""), file, name, name, `${find} (Figma About › cards-info)`)),
  aboutAwards: [
    ["award-pallach.webp", "Entrega de los Premios Josep Pallach", "Josep Pallach Awards ceremony", "Group of people on stage holding a diploma, green screen behind"],
    ["award-if-design.webp", "Línea Signature de Metalquimia", "Metalquimia Signature line", "Black stainless machine detail with a touch screen"],
    ["award-delta.webp", "Premios ADI Delta", "ADI Delta Awards", "«ADI Awards» poster collage above a stainless machine"],
  ].map(([file, es, en, find]) => img(file.replace(".webp", ""), file, es, en, `${find} (Figma About › insights-carousel)`)),
};

// Fotos que el Figma repite entre divisiones: una sola imagen en la biblioteca.
I.curedSteps = [0, 1, 2, 4].map((i) => I.marinatedSteps[i]);
I.petfoodSteps = I.marinatedSteps;
I.snacksSteps = [I.marinatedSteps[0], I.snacksSteps[1], I.marinatedSteps[2], I.marinatedSteps[3], I.marinatedSteps[4]];
I.curedPlates = I.marinatedPlates;
I.snacksPlates = I.petfoodPlates;
I.sausagesPlates = I.petfoodPlates;

// ---------- Bloques repetidos ----------
const logos = (title = L("Con la confianza de los líderes del sector", "Trusted by industry leaders")) => ({
  type: "logo_highlights",
  title,
  logos: [I.logoA, I.logoB, I.logoC, I.logoD, I.logoE, I.logoF, I.logoG, I.logoH, I.logoI].map((image) => ({ image, name: "", url: "" })),
});

const partnership = (titleMuted = L("Partnership para toda la vida", "Partnership for life"), title = L("que genera inventos", "that produces inventions")) => ({
  type: "media_text",
  theme: "light",
  image_position: "left",
  eyebrow: L("PARTNERSHIP FOR LIFE", "PARTNERSHIP FOR LIFE"),
  title_muted: titleMuted,
  title,
  text: L(
    "<p>Trabajamos codo con codo con cada cliente para desarrollar soluciones a medida: de la idea a la planta en producción, y después durante toda la vida de la instalación.</p>",
    "<p>We work side by side with every customer to develop tailor-made solutions: from the idea to the plant in production, and afterwards for the whole life of the installation.</p>",
  ),
  details: "",
  button: link(L("CONÓCENOS", "LEARN MORE"), "@page:partnership"),
  image: I.partner,
});

// Historia de Metalquimia (página About us). Imágenes: las de la web actual (metalquimia.com › Sobre nosotros).
const history = [
  ["1971", "El comienzo de Metalquimia", "The beginning of Metalquimia", "Narcís Lagares la funda en Besalú (Girona) con la visión de innovar en el procesado industrial de la carne.", "Founded by Narcís Lagares in Besalú, Girona, with a vision to innovate in industrial meat processing."],
  ["1972", "Nos trasladamos a Girona", "Moving to Girona", "El rápido crecimiento lleva a la empresa a trasladar su sede a Girona.", "Rapid growth leads the company to relocate its headquarters to Girona."],
  ["1973", "Primeros avances tecnológicos", "First technological breakthroughs", "Desarrolla y patenta MOVISTICK, su primer inyector por aspersión, y CICLOMAT, un reactor automático de masaje de carne al vacío.", "Develops and patents MOVISTICK, its first spray injector, and CICLOMAT, an automatic vacuum meat massage reactor."],
  ["1974", "Inauguramos nuestro primer laboratorio de investigación", "We inaugurate our first laboratory research", "METALQUIMIA inaugura su primer laboratorio y refuerza su compromiso con la investigación y el desarrollo de nuevos ingredientes y aditivos.", "METALQUIMIA inaugurates its first laboratory, reinforcing its commitment to research and the development of new ingredients and additives."],
  ["1975", "Optimizamos la preparación de salmueras", "Optimizing brine preparation", "Metalquimia patenta MOLISTICK, un molino triturador de alta velocidad que mejora la preparación de las salmueras para inyección.", "Metalquimia patents MOLISTICK, a high-speed crushing mill that improves the preparation of brines for injection."],
  ["1976", "Avanzamos en la tecnología de masaje", "Advancing meat massaging technology", "Metalquimia patenta THERMOMAT, el primer reactor de masaje con camisas de frío.", "Metalquimia patents THERMOMAT, the first massage reactor equipped with cooling jackets."],
  ["1977", "Consolidamos el mercado español", "Consolidating the Spanish market", "Metalquimia se convierte en proveedor de confianza de los principales fabricantes de jamón cocido de España.", "Metalquimia becomes a trusted supplier to Spain's leading cooked ham producers."],
  ["1978", "Primeras exportaciones a Europa y América Latina", "The first international exports in Europe and Latin America", "Metalquimia inicia su expansión internacional con exportaciones a mercados de Europa y América Latina.", "Metalquimia begins its international expansion, exporting to markets across Europe and Latin America."],
  ["1979", "Completamos la línea de producción de jamón cocido", "Completing the cooked ham production line", "Metalquimia patenta DOSIMATIC, una embutidora y dosificadora automática que completa las principales etapas de la producción de jamón cocido.", "Metalquimia patents DOSIMATIC, an automatic stuffing and dosing machine that completes the main stages of cooked ham production."],
  ["1980", "Nuestra primera IFFA", "Our first appearance at IFFA", "Metalquimia presenta sus tecnologías y equipos para la producción de jamón cocido en la principal feria internacional de la industria cárnica, en Frankfurt (Alemania).", "Metalquimia presents its technologies and equipment for cooked ham production at the leading international meat industry trade fair in Frankfurt (Germany)."],
  ["1981", "Crecemos en los mercados globales", "Expanding across global markets", "Metalquimia refuerza su presencia internacional con la instalación de líneas de producción en Asia, América y Oceanía.", "Metalquimia strengthens its international presence by installing production lines in Asia, America and Oceania."],
  ["1982", "Ampliamos nuestras instalaciones", "Expanding our facilities", "La creciente demanda lleva a Metalquimia a adquirir terrenos colindantes en Girona y a construir instalaciones que triplican su espacio.", "Growing demand leads Metalquimia to acquire adjoining land in Girona and begin constructing facilities that triple its existing space."],
  ["1984", "Liderando la tecnología de inyección", "Leading the way in injection technology", "Metalquimia mejora los inyectores MOVISTICK con cabezales antiespuma de alta precisión y refuerza su posición en la inyección de salmuera.", "Metalquimia enhances MOVISTICK injectors with high-precision anti-foam heads, strengthening its position in brine injection."],
  ["1985", "La informática llega al procesado de la carne", "Bringing computerization to meat processing", "Metalquimia patenta THERMOCOMPUTER, su primer reactor de masaje automático totalmente informatizado.", "Metalquimia patents THERMOCOMPUTER, its first fully computerized automatic massage reactor."],
  ["1987", "Ampliamos nuestra capacidad de investigación", "Expanding our research capabilities", "Metalquimia amplía sus laboratorios de I+D para abordar las tecnologías emergentes y las necesidades de los mercados internacionales.", "Metalquimia grows its research and development laboratories to address emerging technologies and the needs of international markets."],
  ["1988", "Creciendo con nuestros clientes", "Growing alongside our customers", "El éxito continuado en los productos cocidos de músculo entero impulsa una nueva ampliación de las instalaciones de Metalquimia en Girona.", "Continued success in cooked whole-muscle products drives another expansion of Metalquimia's facilities in Girona."],
  ["1990", "Llega la embutición al vacío", "Introducing vacuum stuffing technology", "Metalquimia patenta VACUMATIC, su primera embutidora automática al vacío para productos de músculo entero.", "Metalquimia patents VACUMATIC, its first automatic vacuum stuffer for whole-muscle products."],
  ["1992", "Reforzamos las relaciones internacionales", "Strengthening international relationships", "El stand de la compañía en IFFA vuelve a ser punto de encuentro de clientes, proveedores y colaboradores de todo el mundo.", "The company's IFFA exhibition once again becomes a meeting point for customers, suppliers and partners from around the world."],
  ["1993", "Entramos en el mercado de los marinados", "Entering the marinated meat market", "Metalquimia lanza sus primeras líneas de marinado para aves y carne fresca y se abre a una nueva categoría de producto.", "Metalquimia launches its first marinating lines for poultry and fresh meat, expanding into a new product category."],
  ["1994", "Llegamos a nuevos mercados internacionales", "Expanding into new international markets", "Metalquimia se consolida en los mercados de la antigua Unión Soviética y de los países árabes con plantas de producción automatizadas a medida.", "Metalquimia establishes a strong presence in former Soviet Union and Arab markets through customized automated production plants."],
  ["1995", "Aceleramos el procesado de la carne", "Accelerating meat processing", "Metalquimia patenta las tecnologías de premasaje MULTIHAMMER y BLADEHAMMER, que reducen los tiempos de proceso y aumentan la productividad.", "Metalquimia patents MULTIHAMMER and BLADEHAMMER pre-massaging technologies, reducing processing times and increasing productivity."],
  ["1996", "Una nueva generación toma el relevo", "A new generation takes the lead", "El fundador, Narcís Lagares, pasa a ser presidente y sus hijos toman el relevo: Josep como CEO y Narcís Jr. al frente de la Dirección de Producción.", "Founder Narcís Lagares becomes President, while his sons take over: Josep as CEO and Narcís Jr. as Production Management."],
  ["1996", "Ampliamos y modernizamos la producción", "Expanding and modernizing production", "En su 25.º aniversario, Metalquimia abre en Girona un nuevo taller de montaje con el triple de capacidad.", "On its 25th anniversary, Metalquimia opens a new assembly workshop in Girona with three times the previous capacity."],
  ["1998", "Avanzamos en la embutición continua al vacío", "Advancing continuous vacuum stuffing", "Metalquimia patenta TWINVAC, un sistema automático de embutición continua al vacío que conserva la forma de las piezas de carne.", "Metalquimia patents TWINVAC, an automatic system designed for continuous vacuum stuffing while preserving the shape of meat pieces."],
  ["1999", "Cabezales de inyección de nueva generación", "Developing next-generation injection heads", "Metalquimia desarrolla y patenta cabezales de inyección retráctiles para productos con hueso y amplía sus capacidades en la fabricación de jamón cocido.", "Metalquimia develops and patents retractable injection heads for bone-in products, broadening its cooked ham manufacturing capabilities."],
  ["2000", "Alianzas estratégicas de I+D", "Building strategic R&D partnerships", "Metalquimia se alía con centros de investigación y clientes clave para desarrollar nuevos productos y tecnologías innovadoras de procesado de la carne.", "Metalquimia establishes alliances with Research Centres and key Customers to develop new products and innovative meat-processing technologies."],
  ["2001", "Treinta años de crecimiento", "Thirty years of growth", "Metalquimia celebra su 30.º aniversario con la apertura de nuevas naves industriales en Palol de Revardit, cerca de Girona.", "Metalquimia celebrates its 30th anniversary by opening new industrial buildings in Palol de Revardit, near Girona."],
  ["2002", "Más rendimiento y terneza", "Improving meat yield and tenderness", "Metalquimia desarrolla y patenta FILOGRIND TWIN, un sistema de tenderizado de doble cabezal que aumenta el rendimiento de los productos cárnicos cocidos.", "Metalquimia develops and patents FILOGRIND TWIN, a dual-head tenderization system that increases yield in cooked meat products."],
  ["2003", "Automatizamos la cocción y la pasteurización", "Automating cooking and pasteurization", "Metalquimia patenta COOKLINE FDC, una línea continua y automática que integra moldeado, cocción, enfriamiento y desmoldeado.", "Metalquimia patents COOKLINE FDC, a continuous automated line integrating moulding, cooking, cooling and demoulding."],
  ["2004", "Entramos en la categoría de curados", "Entering the cured meat category", "Metalquimia patenta la tecnología QDS, que permite el curado acelerado de productos cárnicos loncheados como el salami y el chorizo.", "Metalquimia patents QDS technology, enabling accelerated curing of sliced meat products such as salami and chorizo."],
  ["2006", "Nace la Creativación", "Introducing Creativation", "Metalquimia define su manera de diferenciarse con la Creativación, que une creatividad e innovación con calidad, diseño inteligente y colaboración.", "Metalquimia defines its approach to differentiation through Creativation, combining creativity and innovation with quality, smart design and collaboration."],
  ["2007", "Innovamos en productos marinados", "Innovating in marinated products", "Metalquimia patenta AUVIPLUS, una línea de inyección avanzada que ofrece más precisión en productos marinados y aves.", "Metalquimia patents AUVIPLUS, an advanced injection line offering greater precision for marinated products and poultry."],
  ["2009", "Crecemos para responder a la demanda global", "Scaling up to meet global demand", "El crecimiento internacional impulsa la inauguración de cuatro nuevas plantas de producción en el Polígono Industrial de Palol de Revardit.", "International growth drives the inauguration of four new production facilities in the Palol de Revardit Industrial Park."],
  ["2010", "Una nueva planta piloto para desarrollar productos", "A new pilot plant for product development", "Metalquimia moderniza su planta piloto de Girona para probar y desarrollar nuevos productos cárnicos cocidos con clientes y colaboradores.", "Metalquimia modernizes its Girona pilot plant to test and develop new cooked meat products with customers and partners."],
  ["2011", "Transformamos la producción de curados", "Transforming cured meat production", "Metalquimia patenta las líneas QDS automáticas a gran escala, que reducen el secado y la maduración del curado loncheado de semanas a horas.", "Metalquimia patents large-scale automatic QDS lines, reducing the drying and maturation of sliced cured meat from weeks to hours."],
  ["2012", "Aceleramos el masaje de la carne", "Accelerating meat massaging", "Metalquimia patenta TURBOMEAT, una tecnología de masaje intensivo que acorta los tiempos de proceso y aumenta la productividad.", "Metalquimia patents TURBOMEAT, an intensive massaging technology that shortens processing times and increases productivity."],
  ["2013", "Un centro dedicado a la innovación QDS", "A dedicated centre for QDS innovation", "Metalquimia inaugura en Girona un centro piloto de investigación y tecnología dedicado a desarrollar procesos QDS para productos curados.", "Metalquimia inaugurates a research and technology pilot centre in Girona focused on developing QDS cured-product processes."],
  ["2014", "Devolvemos a la sociedad con la innovación: Fundació Metalquimia", "Giving back through innovation: Metalquimia Foundation", "Metalquimia crea su Fundación para impulsar la creatividad y la innovación en los ámbitos social, cultural, empresarial, educativo y científico.", "Metalquimia establishes its Foundation to promote creativity and innovation across social, cultural, business, educational and scientific fields."],
  ["2015", "Un nuevo capítulo en la dirección", "A new chapter in corporate leadership", "Llorenç Freixanet pasa a ser director general y la empresa reorganiza su dirección para su siguiente etapa.", "Llorenç Freixanet becomes General Manager as the company reorganizes its leadership structure for its next stage of development."],
  ["2016", "Llevamos la inyección más lejos", "Pushing the boundaries of injection", "Metalquimia patenta MOVISTICK TRIPLEX, un inyector de tres cabezales para productos cárnicos con y sin hueso.", "Metalquimia patents MOVISTICK TRIPLEX, a three-head injector designed for bone-in and boneless meat products."],
  ["2016", "Entramos en el mercado de los snacks proteicos", "Entering the protein-snack market", "Metalquimia patenta QDSnacks y lleva su tecnología de proceso acelerado a los snacks cárnicos y de otras proteínas.", "Metalquimia patents QDSnacks, extending its accelerated processing technology to meat and other protein-based snacks."],
  ["2017", "Más investigación en snacks proteicos", "Expanding protein-snack research", "Metalquimia abre en Girona un centro de investigación QDS Snacks dedicado a desarrollar nuevos snacks cárnicos y proteicos.", "Metalquimia opens a dedicated QDS Snacks Research Center in Girona to develop new meat and protein-based snacks."],
  ["2018", "Apostamos por la Industria 4.0", "Embracing Industry 4.0", "Metalquimia integra conectividad, automatización y datos en tiempo real en sus líneas de proceso para mejorar la supervisión y reducir costes.", "Metalquimia integrates connectivity, automation and real-time data across its processing lines to improve monitoring and reduce costs."],
  ["2019", "Fieles a nuestra cita con IFFA", "Continuing a long-standing IFFA tradition", "Metalquimia vuelve a IFFA Frankfurt para presentar sus últimas tecnologías y la quinta edición de su Libro de Artículos Tecnológicos.", "Metalquimia returns to IFFA Frankfurt to present its latest technologies and its fifth edition of the Book of Technological Articles."],
  ["2020", "Innovando en tiempos de incertidumbre", "Innovating through uncertainty", "Pese al confinamiento por la COVID-19, Metalquimia mantiene su espíritu de futuro y comparte un mensaje de esperanza con sus clientes y colaboradores.", "Despite the COVID-19 lockdown, Metalquimia maintains its forward-looking spirit and shares a message of hope with its customers and partners."],
  ["2021", "50 años de innovación", "Celebrating 50 years of innovation", "Metalquimia celebra su 50.º aniversario: cinco décadas de progreso tecnológico y colaboración con la industria.", "Metalquimia marks its 50th anniversary, celebrating five decades of technological progress and industry collaboration."],
].map(([year, leadEs, leadEn, textEs, textEn], i, all) => {
  const n = all.slice(0, i).filter(([y]) => y === year).length;
  const name = `history-${year}${n ? `-${n + 1}` : ""}`;
  return { title: year, lead: L(leadEs, leadEn), text: L(textEs, textEn), image: img(name, `${name}.webp`, leadEs, leadEn, "Archive photo (metalquimia.com › Sobre nosotros › Nuestra historia)") };
});

const insights = (title = L("Últimas novedades", "Latest Insights")) => ({
  type: "insights_carousel",
  title,
  button: link(L("VER TODOS", "VIEW ALL"), "@page:resources"),
  items: [
    { image: I.insight1, category: L("CASO DE ÉXITO", "CASE STUDY"), date: "12.03.2026", title: L("Cómo Metrilus redujo un 40 % las paradas con Metalquimia", "How Metrilus cut downtime by 40% with Metalquimia"), link: link("", "@page:insight") },
    { image: I.insight2, category: L("NOTICIAS", "NEWS"), date: "02.02.2026", title: L("Nueva generación de inyectoras para producto cocido", "A new generation of injectors for cooked products"), link: link("", "@page:insight") },
    { image: I.insight3, category: L("ARTÍCULO", "ARTICLE"), date: "18.01.2026", title: L("Por qué el futuro de la industria cárnica se basa en datos", "Why the future of the meat industry is data-driven"), link: link("", "@page:insight") },
    { image: I.insight4, category: L("REVISTA", "MAGAZINE"), date: "10.12.2025", title: L("El socio de ingeniería para la industria cárnica y de proteínas", "The engineering partner for the meat and protein industry"), link: link("", "@page:insight") },
  ],
});

const caseStudies = () => ({
  type: "case_studies",
  eyebrow: L("CASOS DE ÉXITO", "CASE STUDIES"),
  title_muted: L("Convertimos los retos en", "Turning challenges into"),
  title: L("soluciones basadas en datos", "data-driven solutions"),
  subtitle: "",
  button: link(L("DESCUBRE MÁS", "DISCOVER MORE"), "@page:resources"),
  read_label: L("LEER CASO", "READ CASE"),
  items: [
    { category: L("LOGÍSTICA Y ALMACÉN", "LOGISTICS & WAREHOUSING"), title: L("Cómo Metrilus redujo un 40 % las paradas con Metalquimia", "How Metrilus cut downtime by 40% with Metalquimia"), link: link("", "@page:case-metrilus") },
    { category: L("LOGÍSTICA Y ALMACÉN", "LOGISTICS & WAREHOUSING"), title: L("Cómo Casa Tarradellas redujo un 40 % las paradas con QDS Pro", "How Casa Tarradellas cut downtime by 40% with QDS Pro"), link: link("", "@page:case-tarradellas") },
    { category: L("LOGÍSTICA Y ALMACÉN", "LOGISTICS & WAREHOUSING"), title: L("Cómo ElPozo redujo un 40 % las paradas con QDS", "How ElPozo cut downtime by 40% with QDS"), link: link("", "@page:case-elpozo") },
  ],
});

// Cuerpo del detalle de caso de éxito / insight (Figma 459:24823): tres apartados con título, subtítulo, texto y cita, y fotos entre medias.
const articleBlocks = (photos) => {
  const b = (type, f) => ({ type, title: "", subtitle: "", text: "", image: "", quote: "", caption: "", ...f });
  const parts = [
    [L("El reto: producir más sin perder calidad", "The challenge: producing more without losing quality"), L("Una planta con picos de demanda y paradas imprevistas en las líneas de inyección", "A plant facing demand peaks and unplanned stops on its injection lines"), L("<p>La planta trabajaba a pleno rendimiento y cada parada imprevista se traducía en lotes retrasados y producto fuera de especificación. El equipo necesitaba saber qué ocurría en cada máquina antes de que el problema llegara a la línea.</p><p>Junto a nuestros ingenieros, revisamos el proceso de principio a fin: dosificación de salmuera, presión de inyección, tiempos de masaje y temperatura en cada etapa.</p>", "<p>The plant was running at full capacity and every unplanned stop meant delayed batches and off-spec product. The team needed to know what was happening on each machine before the problem reached the line.</p><p>Together with our engineers, we reviewed the process end to end: brine dosing, injection pressure, tumbling times and temperature at every stage.</p>"), L("«Necesitábamos ver el proceso en tiempo real, no descubrir los problemas al final del turno.»", "“We needed to see the process in real time, not discover problems at the end of the shift.”")],
    [L("La solución: datos en cada etapa", "The solution: data at every stage"), L("Inyectoras conectadas a MQConnect y parámetros ajustados por lote", "Injectors connected to MQConnect and parameters tuned per batch"), L("<p>Instalamos inyectoras de última generación conectadas a MQConnect, que registra cada lote y lo compara con los anteriores. Las alertas avisan de cualquier desviación antes de que afecte al producto.</p><p>El equipo de planta recibió formación para interpretar los datos y ajustar las recetas sin depender de soporte externo.</p>", "<p>We installed latest-generation injectors connected to MQConnect, which logs every batch and compares it with previous ones. Alerts flag any deviation before it affects the product.</p><p>The plant team was trained to interpret the data and fine-tune recipes without relying on external support.</p>"), L("«Lo que no se mide no se puede mejorar.»", "“What isn't measured can't be improved.”")],
    [L("El resultado: un 40 % menos de paradas", "The result: 40% less downtime"), L("Más producción, menos merma y una calidad constante lote a lote", "More output, less waste and consistent quality batch after batch"), L("<p>En los seis primeros meses las paradas imprevistas cayeron un 40 % y la merma se redujo de forma sostenida. La calidad del producto se mantiene constante independientemente del turno.</p><p>Hoy la planta planifica el mantenimiento con datos y ha ampliado la línea con una segunda inyectora.</p>", "<p>In the first six months unplanned stops fell by 40% and waste dropped steadily. Product quality now stays consistent regardless of the shift.</p><p>Today the plant plans maintenance with data and has expanded the line with a second injector.</p>"), L("«Metalquimia no es un proveedor: es un socio de ingeniería.»", "“Metalquimia isn't a supplier: it's an engineering partner.”")],
  ];
  return parts.flatMap(([title, subtitle, text, quote], i) => [
    b("heading", { title, subtitle }),
    b("text", { text }),
    b("quote", { quote }),
    ...(photos[i] ? [b("image", { image: photos[i] })] : []),
  ]);
};

// Detalle de un caso de éxito (cuelga de Recursos).
const casePage = (key, client, titleEs, titleEn, slugEs, slugEn, image) => ({
  key,
  parent: "resources",
  es: { title: titleEs, slug: slugEs },
  en: { title: titleEn, slug: slugEn },
  sections: [
    {
      type: "article",
      category: L("LOGÍSTICA Y ALMACÉN", "LOGISTICS & WAREHOUSING"),
      reading_time: L("10 MIN DE LECTURA", "10 MIN READ"),
      date: L("22 de enero de 2026", "22 January 2026"),
      title: L(titleEs, titleEn),
      intro: L(`Cómo ${client} redujo las paradas imprevistas y ganó control sobre cada lote gracias a la tecnología de inyección y los datos de Metalquimia.`, `How ${client} cut unplanned stops and gained control over every batch with Metalquimia injection technology and data.`),
      author: "Metalquimia",
      author_label: L("Escrito por", "Written by"),
      date_label: L("Publicado el", "Published on"),
      image,
      blocks: articleBlocks([I.caseRing, I.caseMachines]),
    },
    caseStudies(),
  ],
});


const method = (dark = true, image = I.hamSlices) => ({
  type: "highlight",
  eyebrow: L("EL MÉTODO METALQUIMIA", "THE METALQUIMIA METHOD"),
  word_top: "Meat.",
  word_bottom: "The Next.",
  image,
  tags: [
    { label: L("Inyección precisa", "Precision injection") },
    { label: L("Masaje refrigerado", "Refrigerated tumbling") },
    { label: L("Control sin contacto", "Contactless control") },
    { label: L("Inteligencia térmica", "Thermal intelligence") },
  ],
  items: [
    { title: L("Masaje refrigerado.", "Refrigerated Tumbling."), text: L("Mantenemos la temperatura ideal durante todo el proceso para proteger la textura y la seguridad alimentaria.", "We keep the ideal temperature throughout the process to protect texture and food safety.") },
    { title: L("Inyección de precisión.", "Precision Injection."), text: L("Cada aguja dosifica exactamente la salmuera necesaria para un reparto uniforme pieza a pieza.", "Every needle doses exactly the brine needed for an even distribution, piece after piece.") },
    { title: L("Inteligencia térmica.", "Thermal Intelligence."), text: L("Sensores y software ajustan la cocción en tiempo real para un producto final constante.", "Sensors and software adjust cooking in real time for a consistent final product.") },
    { title: L("Control sin contacto.", "Contactless Control."), text: L("Supervisa y ajusta toda la línea desde MQConnect, sin detener la producción.", "Monitor and adjust the whole line from MQConnect, without stopping production.") },
  ],
  overlay_title: dark ? L("Partnership para toda la vida", "Partnership for life") : "",
  overlay_text: dark ? L("Acompañamos a cada cliente desde el diseño de la planta hasta el servicio posventa.", "We support every customer from plant design to after-sales service.") : "",
  overlay_image: dark ? I.partner : "",
  overlay_button: dark ? link(L("SABER MÁS", "LEARN MORE"), "@page:partnership") : null,
});

// Cabecera centrada y cuatro características numeradas sobre negro (Figma Página de máquina e Industry › Hightlights).
/** Carrusel oscuro "Decisiones de ingeniería que hacen diferente a la MOVIPLUS 4.0" (Figma MQ Innovation Center y Services). */
const moviplusDifferent = () => ({
  type: "highlights_carousel",
  theme: "dark",
  eyebrow: L("POR QUÉ ES DIFERENTE", "WHY IT'S DIFFERENT"),
  title_muted: L("Decisiones de ingeniería que hacen", "Engineering decisions that make"),
  title: L("diferente a la MOVIPLUS 4.0.", "the MOVIPLUS 4.0 different."),
  subtitle: L("El sistema lee en continuo la resistencia a la inyección y ajusta la presión de las agujas en cada ciclo.", "The system continuously reads injection resistance and adjusts needle pressure cycle by cycle."),
  button: null,
  items: [
    [L("Conectividad 4.0 total.", "Total 4.0 Connectivity."), L("Integración completa con MQConnect para supervisar la inyección en tiempo real, registrar parámetros y diagnosticar en remoto.", "Full integration with MQConnect for real-time injection monitoring, parameter logging, and remote diagnostics.")],
    [L("Inyección autorregulada.", "Self-regulating injection."), L("El sistema lee en continuo la resistencia a la inyección y ajusta la presión de las agujas en cada ciclo.", "The system continuously reads injection resistance and adjusts needle pressure cycle by cycle.")],
    [L("Tecnología SPRAYPLUS.", "SPRAYPLUS Technology."), L("El sistema de reparto de salmuera propio de Metalquimia. Satura de forma homogénea todo el grosor de la pieza.", "Metalquimia's proprietary brine distribution system. Delivers homogeneous saturation through the full muscle depth.")],
    [L("Más ciclos por minuto.", "Higher cycle throughput."), L("Un diseño mecánico optimizado aumenta los ciclos de inyección por minuto sin perder calidad de reparto.", "Optimised mechanical design increases injection cycles per minute without sacrificing distribution quality.")],
    [L("Diseño higiénico inteligente.", "Intelligent hygienic design."), L("Pensado para cumplir las normas de seguridad alimentaria más exigentes y para que la limpieza en línea sea más rápida y fiable.", "Engineered to meet the most demanding food safety standards and to make cleaning faster and more reliable on the line.")],
  ].map(([lead, text], i) => ({ image: i % 2 ? I.innovationRobot : I.innovationLine, tone: i % 2 ? "light" : "dark", lead, text, link: null })),
});

const engineeringMethod = () => ({
    type: "highlight",
    eyebrow: L("INGENIERÍA DE MAQUINARIA DE PRIMER NIVEL", "TOP NOTCH MACHINE ENGINEERING"),
    word_top: "",
    word_bottom: "",
    title_muted: L("El método de ingeniería Metalquimia", "Metalquimia engineering method"),
    title: L("que genera inventos", "that produces inventions"),
    button: link(L("DESCUBRE CÓMO PENSAMOS", "SEE HOW WE THINK"), "@page:engineering"),
    image: "",
    tags: [],
    items: [
      {
        title: L("Precisión que nunca sacrifica el rendimiento", "Precision that never compromises yield"),
        text: L("Nuestros equipos están diseñados para trabajar con tolerancias que la maquinaria industrial estándar no alcanza.", "Our equipment is engineered to operate within tolerances that standard industrial machinery can't achieve."),
      },
      {
        title: L("Fiabilidad integrada en el diseño", "Reliability built into the design"),
        text: L("Diseñamos nosotros mismos cada componente. La fiabilidad está desde el principio: no como una promesa de soporte, sino como un estándar de ingeniería.", "We designed every component ourselves. We built reliability in from the start — not as a support promise, but as an engineering standard."),
      },
      {
        title: L("Tecnología propia", "Proprietary technology"),
        text: L("A diferencia de los integradores, cada tecnología crítica de nuestros equipos es nuestra. Eso significa mejoras más rápidas, un conocimiento más profundo del proceso y una evolución de la línea sin saltos.", "Unlike integrators, we own every critical technology in our equipment. That means faster upgrades, deeper process knowledge, and seamless line evolution."),
      },
      {
        title: L("Un socio que inventó el proceso", "A partner who invented the process"),
        text: L("Nuestros ingenieros conocen la ciencia exacta detrás del diseño de cada componente. Ese conocimiento nos convierte en el socio capaz de resolver lo que otros solo pueden esquivar.", "Our engineers understand the exact science behind the design of every component. That depth of knowledge makes us the partner capable of solving what others can only work around."),
      },
    ],
    overlay_title: "",
    overlay_text: "",
    overlay_image: "",
    overlay_button: null,
});

const banner = () => ({
  type: "banner_full_screen",
  image: I.factory,
  lines: [{ text: L("Nuestras patentes.", "Our patents.") }, { text: L("Nuestro proceso.", "Our process.") }, { text: L("Nuestra ventaja.", "Our advantage.") }],
  button: link(L("DESCUBRE NUESTRA TECNOLOGÍA", "DISCOVER OUR TECHNOLOGY"), "@page:technologies"),
  corner_color: "white",
});

const machines = (titleMuted, title, n = 8) => ({
  type: "products_highlight",
  eyebrow: L("EQUIPOS", "EQUIPMENT"),
  title_muted: titleMuted,
  title,
  subtitle: "",
  button: null,
  show_filters: true,
  all_label: L("TODOS", "ALL"),
  items: [
    { image: I.m1, name: "Movistick", category: L("INYECCIÓN", "INJECTION"), description: L("Inyectora de agujas para piezas enteras con dosificación precisa.", "Needle injector for whole muscle pieces with precise dosing."), link: link("", "@page:machine") },
    { image: I.m2, name: "Movitumbler", category: L("MASAJE", "TUMBLING"), description: L("Masajeadora al vacío con control de temperatura.", "Vacuum tumbler with temperature control."), link: link("", "@page:machine") },
    { image: I.m3, name: "Moviplus 4.0", category: L("INYECCIÓN", "INJECTION"), description: L("Inyección inteligente conectada a MQConnect.", "Smart injection connected to MQConnect."), link: link("", "@page:machine") },
    { image: I.m4, name: "Movitender", category: L("TENDERIZADO", "TENDERIZING"), description: L("Tenderizadora para mejorar la textura y la absorción.", "Tenderizer to improve texture and absorption."), link: link("", "@page:machine") },
    { image: I.m2, name: "Movicook", category: L("COCCIÓN", "COOKING"), description: L("Cocción controlada para un producto uniforme.", "Controlled cooking for a uniform product."), link: link("", "@page:machine") },
    { image: I.m1, name: "Movimax Zero", category: L("INYECCIÓN", "INJECTION"), description: L("Alta capacidad para grandes producciones.", "High capacity for large productions."), link: link("", "@page:machine") },
    { image: I.m3, name: "Movistuff", category: L("EMBUTICIÓN", "STUFFING"), description: L("Embutición continua y precisa.", "Continuous, precise stuffing."), link: link("", "@page:machine") },
    { image: I.m4, name: "Moviprep", category: L("SALMUERAS", "BRINES"), description: L("Preparación automática de salmueras.", "Automatic brine preparation."), link: link("", "@page:machine") },
  ].slice(0, n),
});

// ---------- Páginas de soluciones (misma plantilla, distinto contenido) ----------
// `custom` sustituye campos de una sección concreta (hero, steps, results, machines, method, partnership) cuando la página tiene textos propios en el Figma.
const division = ({ key, slugEs, slugEn, word, nameEs, products, heroMuted, heroTitle, stepsMuted, stepsTitle, uniform, equipMuted, equipTitle, recipeMuted, recipeTitle, plates, custom = {} }) => ({
  key,
  parent: "solutions",
  es: { title: nameEs, slug: slugEs },
  en: { title: word, slug: slugEn },
  sections: [
    {
      type: "hero_division",
      word,
      images: products.map((image) => ({ image })),
      title_muted: heroMuted,
      title: heroTitle,
      text: L(
        "Diseñamos y fabricamos toda la línea: preparación de salmuera, inyección, masaje, cocción y loncheado, conectados y bajo control.",
        "We design and build the whole line: brine preparation, injection, tumbling, cooking and slicing, connected and under control.",
      ),
      button: link(L("SOLICITA INFORMACIÓN", "REQUEST INFO"), "@page:contact#form"),
      ...custom.hero,
    },
    {
      type: "steps_carousel",
      theme: "light",
      eyebrow: L("UN SOLO SOCIO PARA TODO EL PROCESO", "ONE PARTNER FOR THE WHOLE PROCESS"),
      title_muted: stepsMuted,
      title: stepsTitle,
      subtitle: "",
      button: null,
      items: [
        { image: I.step1, lead: L("Preparación de salmuera.", "Brine preparation."), text: L("Disolución homogénea y a la temperatura correcta.", "Homogeneous dissolution at the right temperature.") },
        { image: I.step2, lead: L("Inyección.", "Injection."), text: L("Reparto uniforme en cada pieza.", "Even distribution in every piece.") },
        { image: I.step3, lead: L("Masaje y reposo.", "Tumbling and resting."), text: L("Extracción de proteína sin dañar la fibra.", "Protein extraction without damaging the fibre.") },
        { image: I.step4, lead: L("Cocción.", "Cooking."), text: L("Curvas de temperatura controladas.", "Controlled temperature curves.") },
        { image: I.step5, lead: L("Loncheado y envasado.", "Slicing and packing."), text: L("Rendimiento máximo al final de la línea.", "Maximum yield at the end of the line.") },
      ],
      ...custom.steps,
    },
    { type: "gradient_divider", direction: "down" },
    {
      type: "highlights_carousel",
      theme: "dark",
      eyebrow: L("RESULTADO", "RESULT"),
      title_muted: "",
      title: uniform,
      subtitle: "",
      button: null,
      items: plates.map((image, i) => ({
        image,
        lead: [L("Textura firme.", "Firm texture."), L("Color homogéneo.", "Even colour."), L("Loncheado limpio.", "Clean slicing."), L("Sabor constante.", "Consistent flavour."), L("Menos merma.", "Less waste.")][i % 5],
        text: L("Cada lote igual que el anterior.", "Every batch just like the last."),
        link: null,
      })),
      ...custom.results,
    },
    { ...machines(equipMuted, equipTitle), ...custom.machines },
    { ...method(true), ...custom.method },
    { type: "gradient_divider", direction: "up" },
    { ...partnership(recipeMuted, recipeTitle), ...custom.partnership },
    insights(),
  ],
});

// Textos e imágenes propios de Cocidos (Figma Páginas › División 177:735).
const cooked = {
  hero: {
    text: L(
      "Productos cárnicos cocidos de músculo entero / Embutidos cocidos. Ofrecemos los equipos y la tecnología más avanzados para la elaboración de productos cárnicos cocidos de músculo entero (jamón cocido, paleta cocida, bacon, etc.), junto con los últimos sistemas de embutido y cocción de salchichas.",
      "Cooked meat products from whole muscle / Cooked Sausages. We offer the most advanced equipment and technology for the production of cooked meat products from whole muscle (cooked ham, cooked shoulder, bacon, etc.), along with the latest loading and cooking systems for sausages.",
    ),
  },
  steps: {
    eyebrow: L("INGENIERÍA DE PROCESO DE PRINCIPIO A FIN", "END-TO-END PROCESS ENGINEERING"),
    items: [
      [L("Preparación de salmuera.", "Brine preparation."), L("Formulación precisa para la inyección, con control total sobre la base de cada producto cocido constante.", "Precision formulation for injection, giving you full control over the foundation of every consistent cooked product.")],
      [L("Inyección multiaguja.", "Multi-needle injection."), L("Reparto uniforme de la salmuera en todo el músculo, sea cual sea el tamaño o la forma de la pieza, para eliminar la variabilidad del rendimiento desde el origen.", "Uniform brine distribution throughout the whole muscle, regardless of piece size or shape, engineered to eliminate yield variability at the source.")],
      [L("Masaje y malaxado.", "Tumbling and massaging."), L("Acción mecánica controlada que asegura la extracción de proteína, el ligado de la salmuera y el desarrollo de la textura con tecnología de bombo refrigerado.", "Controlled mechanical action that ensures protein extraction, brine binding, and texture development with refrigerated drum technology.")],
      [L("Tratamiento térmico.", "Thermal processing."), L("Ciclos de cocción, ahumado y enfriamiento diseñados para una temperatura uniforme en el corazón y una textura óptima, configurables para cada especificación de producto.", "Cooking, smoking, and chilling cycles designed for uniform core temperature and optimal texture retention — configurable for each product specification.")],
      [L("Control de proceso conectado.", "Connected process control."), L("MQConnect integra los datos de cada etapa en un único panel para una trazabilidad completa y la mejora continua del proceso.", "MQConnect integrates data from every stage into a single dashboard for full traceability and continuous process improvement.")],
    ].map(([lead, text], i) => ({ image: I.cookedSteps[i], lead, text })),
  },
  results: {
    eyebrow: L("APLICACIONES", "APPLICATIONS"),
    items: I.cookedPlates.map((image) => ({ image, lead: "", text: "", link: null })),
    subtitle: L(
      "Soluciones Metalquimia para elaborar la más amplia gama de productos cárnicos cocidos de músculo entero, en todas las categorías de rendimiento: desde la descongelación de bloques de carne hasta la inyección de jamón y paleta cocidos de músculo entero, la producción de bacon, la cocción de salchichas y la cocción de productos al vacío.",
      "Metalquimia solutions for the production of the widest range of cooked whole muscle meat products, covering all performance categories: from meat block thawing to the injection of whole muscle cooked ham and shoulder, bacon production, sausage cooking and the cooking of sous-vide products.",
    ),
  },
  machines: {
    eyebrow: L("EQUIPOS PARA EL PROCESADO DE COCIDOS", "EQUIPMENT FOR COOKED PROCESSING"),
    show_filters: false,
    items: [
      [I.machineDefroster, L("Descongelación de carne", "Meat Defrosting"), L("Masaje muy suave: producto descongelado de la máxima calidad", "Very gentle massage: thawed product of the highest quality")],
      [I.machineTumbler, L("Preparación de salmueras", "Preparation of Brines"), L("Preparación rápida, controlada y eficiente de cualquier tipo de salmuera y adobo", "Quick, controlled, and efficient preparation of any type of brine and marinade")],
      [I.machineInjector, L("Inyectoras de carne", "Meat Injectors"), L("Reparto espectacular de la salmuera y uniformidad de color", "Spectacular distribution of brine and uniformity of color")],
      [I.machineDefroster, L("Tenderizado de carne", "Meat Tenderization"), L("Mejora del rendimiento y reducción de las mermas de cocción", "Improvement of yield and reduction of cooking losses")],
      [I.machineDefroster, L("Masaje de carne", "Meat Massage"), L("Reactores automáticos de vacío con camisa de refrigeración, totalmente versátiles", "Automatic vacuum reactors with a cooling jacket, fully versatile")],
      [I.machineTumbler, L("Embutición de carne", "Meat Stuffing"), L("Embutidoras continuas al vacío para músculo entero", "Continuous vacuum stuffers for whole muscle")],
      [I.machineInjector, L("Cocción de carne", "Meat Cooking"), L("Cocción inteligente con monitorización y registro de todos los parámetros técnicos del proceso", "Smart cooking with monitoring and recording of all technical parameters of the process")],
      ["", L("Plantas automáticas de cocción y marinado", "Automatic Cooking and Marinating Plants"), L("Conectividad inteligente", "Smart connectivity")],
    ].map(([image, name, description]) => ({ image, name, category: "", description, link: link("", "@page:machine") })),
  },
  method: {
    eyebrow: L("INGENIERÍA DE MAQUINARIA DE PRIMER NIVEL", "TOP NOTCH MACHINE ENGINEERING"),
    tags: [{ label: L("Partnership para toda la vida", "Partnership for life") }, { label: L("Dando forma al futuro de la alimentación", "Shaping the future of food") }, { label: L("Innovación que crea", "Innovation that creates") }],
    items: [
      { title: L("Masaje refrigerado.", "Refrigerated Tumbling."), text: L("Metalquimia fue pionera en el bombo de masaje refrigerado, una tecnología que controla con precisión la temperatura de extracción de la proteína, elimina el riesgo microbiológico y maximiza el ligado de la salmuera y la textura final.", "Metalquimia pioneered the refrigerated massage drum — a technology that controls protein extraction temperature with precision, eliminating microbial risk while maximizing brine binding and final texture quality.") },
      { title: L("Inyección de precisión.", "Precision Injection."), text: L("Nuestros sistemas de inyección multiaguja reparten la salmuera de forma uniforme en músculos de geometría irregular: una variable crítica que los inyectores estándar dejan al azar y que nosotros hemos convertido en un parámetro controlable.", "Our multi-needle injection systems are engineered for uniform brine distribution across irregular muscle geometries — a critical variable that standard injectors leave to chance, and we've turned into a controllable parameter.") },
      { title: L("Inteligencia térmica.", "Thermal Intelligence."), text: L("Nuestros sistemas de cocción y enfriamiento modelan la transferencia de calor en toda la pieza, no solo en la superficie. El resultado: proceso uniforme en el corazón, ciclos más cortos y una textura constante del borde al centro.", "Our cooking and chilling systems model heat transfer across the whole piece — not just surface temperature. The result is uniform core processing, reduced cycle time, and consistent texture from edge to center.") },
      { title: L("Control conectado.", "Connected Control."), text: L("MQConnect enlaza en tiempo real cada parámetro del proceso de cocidos: ritmo de inyección, ciclos de masaje, curva térmica y velocidad de enfriamiento. Trazabilidad completa, alertas de proceso y datos continuos para optimizar el rendimiento.", "MQConnect links every cooked process parameter in real time — injection rate, tumbling cycles, thermal curve, chilling speed. Full traceability, process alerts, and continuous data for ongoing yield optimization.") },
    ],
  },
  partnership: {
    text: L("<p>La Creativación es la forma en que Metalquimia entiende la I+D: un proceso en el que el conocimiento profundo del proceso, la ciencia de los alimentos y la ingeniería mecánica se unen para crear soluciones que antes no existían.</p>", "<p>Creativation is Metalquimia's approach to R&D: a process where deep process knowledge, food science, and mechanical engineering converge to create solutions that didn't exist before.</p>"),
    button: link(L("Descubre nuestro modelo", "Discover our model"), "@page:partnership"),
  },
};

const marinated = {
  hero: {
    text: L(
      "Los equipos de marinado de Metalquimia permiten inyectar y retener en la carne todo tipo de salmueras y adobos, con un reparto espectacular, sin zonas muertas, un goteo de salmuera mínimo y un respeto total por la morfología y la textura del músculo.",
      "Metalquimia marinating equipment allows for the injection and retention of all types of brines and marinades in the meat, with spectacular distribution, no dead zones, minimal brine drainage, and complete respect for the morphology and muscle texture.",
    ),
  },
  steps: {
    eyebrow: L("INGENIERÍA DE PROCESO DE PRINCIPIO A FIN", "END-TO-END PROCESS ENGINEERING"),
    items: [
      [L("Preparación del adobo.", "Marinade preparation."), L("Formulación controlada de adobos líquidos y secos: temperatura, viscosidad y homogeneidad gestionadas con precisión antes de que el producto entre en la línea.", "Controlled formulation of liquid and dry marinades — temperature, viscosity, and homogeneity precisely managed before the product ever enters the line.")],
      [L("Marinado por inyección.", "Injection marination."), L("Para una penetración profunda y uniforme en músculo entero y piezas con hueso: sistemas de inyección calibrados según la densidad y la geometría de cada tipo de producto.", "For deep, uniform penetration on whole muscle and bone-in cuts — injection systems calibrated to the specific density and geometry of each product type.")],
      [L("Masaje y absorción.", "Tumbling and absorption."), L("Acción mecánica que abre la estructura de la fibra muscular y lleva el adobo a toda la pieza, no solo a la superficie.", "Mechanical action that opens the muscle fiber structure and drives marinade absorption throughout, not just on the surface.")],
      [L("Recubrimiento y aplicación en superficie.", "Coating and surface application."), L("Para productos con sazonado o recubrimiento visible: sistemas de aplicación precisos y repetibles que mantienen la uniformidad de cada porción a plena producción.", "For products requiring visible seasoning or coating — precise, repeatable application systems that maintain portion consistency at throughput.")],
      [L("Control de proceso conectado.", "Connected process control."), L("MQConnect integra los datos de cada etapa en un único panel para una trazabilidad completa y la mejora continua del proceso.", "MQConnect integrates data from every stage into a single dashboard for full traceability and continuous process improvement.")],
    ].map(([lead, text], i) => ({ image: I.marinatedSteps[i], lead, text })),
  },
  results: {
    eyebrow: L("APLICACIONES", "APPLICATIONS"),
    subtitle: L(
      "Diseñados específicamente para marinar carnes (cerdo, vacuno, aves enteras y en piezas), los equipos de marinado de Metalquimia logran un reparto espectacular de salmueras y adobos sin zonas muertas, con un goteo mínimo y un respeto total por la morfología y la textura del músculo. También ofrecemos opciones para marinar pescado, una apuesta de futuro.",
      "Specifically designed for marinating meats (pork, beef, whole poultry, and parts), Metalquimia's marinating equipment achieves a spectacular distribution of brines and marinades without dead zones, minimal drainage, and complete respect for muscle morphology and texture. We also offer options for marinating fish meats, a bet on the future.",
    ),
    // Figma: tres tarjetas con rótulo arriba (texto negro sobre foto clara).
    items: [
      L("Marinado de carnes frescas de ave", "Fresh poultry marinating"),
      L("Marinado de pescado", "Fish marinating"),
      L("Marinado de carne fresca", "Fresh meat marinating"),
    ].map((lead, i) => ({ image: I.marinatedPlates[i], lead, text: "", link: null })),
  },
  machines: {
    eyebrow: L("EQUIPOS PARA EL PROCESADO DE MARINADOS", "EQUIPMENT FOR MARINATED PROCESSING"),
    show_filters: false,
    items: [
      [I.machineDefroster, L("Descongelación de carne", "Meat Defrosting"), L("Masaje muy suave: producto descongelado de la máxima calidad", "Very gentle massage: thawed product of the highest quality")],
      [I.machineTumbler, L("Preparación de salmueras", "Preparation of Brines"), L("Preparación rápida, controlada y eficiente de cualquier tipo de salmuera y adobo", "Quick, controlled, and efficient preparation of any type of brine and marinade")],
      [I.machineInjector, L("Inyectoras de carne", "Meat Injectors"), L("Reparto espectacular de la salmuera y uniformidad de color", "Spectacular distribution of brine and uniformity of color")],
      // Figma repite aquí la descripción del tenderizado.
      [I.machineDefroster, L("Marinado de carne", "Meat marinade"), L("Mejora del rendimiento y reducción de las mermas de cocción", "Improvement of yield and reduction of cooking losses")],
      [I.machineDefroster, L("Tenderizado de carne", "Meat Tenderization"), L("Mejora del rendimiento y reducción de las mermas de cocción", "Improvement of yield and reduction of cooking losses")],
      [I.machineTumbler, L("Masaje de carne", "Meat Massage"), L("Reactores automáticos de vacío con camisa de refrigeración, totalmente versátiles", "Automatic vacuum reactors with a cooling jacket, fully versatile")],
      [I.machineInjector, L("Embutición de carne", "Meat Stuffing"), L("Embutidoras continuas al vacío para músculo entero", "Continuous vacuum stuffers for whole muscle")],
      ["", L("Cocción de carne", "Meat Cooking"), L("Cocción inteligente con monitorización y registro de todos los parámetros técnicos del proceso", "Smart cooking with monitoring and recording of all technical parameters of the process")],
    ].map(([image, name, description]) => ({ image, name, category: "", description, link: link("", "@page:machine") })),
  },
  method: {
    eyebrow: L("INGENIERÍA DE MAQUINARIA DE PRIMER NIVEL", "TOP NOTCH MACHINE ENGINEERING"),
    image: I.marinatedHighlight,
    tags: [{ label: L("Partnership para toda la vida", "Partnership for life") }, { label: L("Dando forma al futuro de la alimentación", "Shaping the future of food") }, { label: L("Innovación que crea", "Innovation that creates") }],
    items: [
      { title: L("Penetración profunda.", "Deep Penetration."), text: L("Los sistemas de inyección y masaje de Metalquimia trabajan en secuencia para llevar el adobo más allá de la capa superficial: sabor y humedad uniformes en todo el espesor del músculo, sin corazones secos ni sazonado desigual.", "Metalquimia's injection and tumbling systems work in sequence to drive marinade absorption beyond the surface layer — achieving uniform flavor and moisture distribution through the full muscle depth, eliminating dry cores and uneven seasoning.") },
      { title: L("Recetas repetibles.", "Recipe Repeatability."), text: L("Cada parámetro del marinado (ritmo de inyección, tiempo de masaje, nivel de vacío, temperatura) se controla digitalmente y se guarda por receta en MQConnect. Con el mismo producto en otro turno, el resultado es idéntico.", "Every marination parameter — injection rate, tumbling time, vacuum level, temperature — is digitally controlled and stored per recipe via MQConnect. Run the same product on a different shift, and the result is identical.") },
      { title: L("Control del rendimiento.", "Yield Control."), text: L("La tecnología de inyección autorregulada se adapta continuamente a las variaciones de densidad y tamaño de la materia prima, y mantiene la absorción de adobo objetivo pese a la variabilidad natural del producto que entra.", "Self-regulating injection technology continuously adjusts to variation in raw material density and piece size — maintaining target marinade uptake regardless of the natural variability in incoming product.") },
      { title: L("Diseño higiénico.", "Hygienic Design."), text: L("Todas las superficies en contacto con el producto están pensadas para una limpieza rápida y fiable, clave en el marinado, donde hay que controlar los restos líquidos y el riesgo biológico. Desmontaje sin herramientas y arquitectura compatible con CIP en toda la máquina.", "All product-contact surfaces are engineered for fast, reliable cleaning — critical in marination where liquid residue and biological risk must be controlled. Tool-free disassembly and CIP-compatible architecture throughout.") },
    ],
  },
  partnership: {
    text: L(
      "<p>Nuevas especificaciones de la distribución, nuevos formatos, nuevas fuentes de materia prima: las exigencias sobre tu línea de marinado nunca se detienen. Con el modelo de partnership de Metalquimia, nuestros ingenieros de proceso siguen a tu lado a medida que evoluciona tu gama.</p>",
      "<p>New retail specifications, new product formats, new raw material sources — the demands on your marination line never stand still. Metalquimia's partnership model means our process engineers stay involved as your range evolves.</p>",
    ),
    button: link(L("Descubre nuestro modelo", "Discover our model"), "@page:partnership"),
  },
};

const cured = {
  hero: {
    text: L(
      "Curado acelerado de productos cárnicos loncheados que se aplica justo después de la cocción: reduce drásticamente la fase de secado y maduración, simplifica mucho el proceso y mejora notablemente la eficiencia energética.",
      "Accelerated curing of sliced meat products that is applied directly after cooking, drastically reducing the drying and maturation phase, greatly simplifying the process and significantly improving energy efficiency.",
    ),
  },
  steps: {
    eyebrow: L("INGENIERÍA DE PROCESO DE PRINCIPIO A FIN", "END-TO-END PROCESS ENGINEERING"),
    items: [
      [I.curedSteps[0], L("Formulación de salmuera y curado.", "Brine and cure formulation."), L("Preparación precisa de las salmueras de curado, controladas según especificación antes del contacto con el producto, para eliminar la variabilidad que nace en la formulación.", "Precision preparation of curing brines and controlled to specification before product contact, eliminating the variability that begins at the formulation stage.")],
      [I.curedSteps[1], L("Inyección multiaguja.", "Multi-needle injection."), L("Reparto uniforme de la salmuera en todo el músculo, sea cual sea el tamaño o la forma de la pieza, para eliminar la variabilidad del rendimiento desde el origen.", "Uniform brine distribution throughout the whole muscle, regardless of piece size or shape, engineered to eliminate yield variability at the source.")],
      [I.curedSteps[2], L("Reposo y estabilización.", "Resting and equalization."), L("Periodos de reposo controlados para que los agentes de curado migren y se estabilicen en toda la estructura del músculo, según la especificación de cada producto.", "Controlled holding periods that allow curing agents to migrate and stabilize throughout the muscle structure to specification for each product type.")],
      ["", L("Embutido y formado.", "Stuffing and forming."), L("Llenado y formado precisos para productos curados de músculo entero, manteniendo la integridad estructural que exigen las especificaciones premium de retail y foodservice.", "Precise filling and forming for cured whole muscle products, maintaining the structural integrity that premium retail and food service specifications require.")],
      [I.curedSteps[3], L("Control de proceso conectado.", "Connected process control."), L("MQConnect integra los datos de cada etapa en un único panel para una trazabilidad completa y la mejora continua del proceso.", "MQConnect integrates data from every stage into a single dashboard for full traceability and continuous process improvement.")],
    ].map(([image, lead, text]) => ({ image, lead, text })),
  },
  results: {
    eyebrow: L("APLICACIONES", "APPLICATIONS"),
    // Título de tres líneas todo en blanco: sin parte gris.
    title_muted: "",
    title: L(
      "Aportamos una mejora notable en la constancia de la calidad del producto, mejorando la seguridad alimentaria y reduciendo el riesgo de alteraciones del producto final.",
      "We provide a notable boost in product quality consistency, improving food safety and lowering the risk of final product changes.",
    ),
    subtitle: L(
      "La rapidez del QDS Process® elimina por completo la formación de moho en superficie y mejora notablemente el color y el aspecto del producto final, gracias a un menor grado de oxidación.",
      "The speed of the QDS Process® completely eliminates the formation of surface mold and allows for a significant improvement in the color and appearance of the final product, resulting from a lower degree of oxidation.",
    ),
    items: I.curedPlates.map((image) => ({ image, lead: "", text: "", link: null })),
  },
  machines: {
    eyebrow: L("EQUIPOS PARA EL PROCESADO DE CURADOS", "EQUIPMENT FOR CURED PROCESSING"),
    show_filters: false,
    items: [
      [I.machineDefroster, L("Descongelación de carne", "Meat Defrosting"), L("Masaje muy suave: producto descongelado de la máxima calidad", "Very gentle massage: thawed product of the highest quality")],
      [I.machineTumbler, L("QDSolutions - Fiambres y snacks", "QDSolutions - Deli Meats and Snacks"), L("Conectividad total 4.0: la curación del futuro.", "Total Connectivity 4.0: The Curation of the Future.")],
    ].map(([image, name, description]) => ({ image, name, category: "", description, link: link("", "@page:machine") })),
  },
  method: {
    eyebrow: L("INGENIERÍA DE MAQUINARIA DE PRIMER NIVEL", "TOP NOTCH MACHINE ENGINEERING"),
    image: I.curedHighlight,
    tags: [{ label: L("Partnership para toda la vida", "Partnership for life") }, { label: L("Dando forma al futuro de la alimentación", "Shaping the future of food") }, { label: L("Innovación que crea", "Innovation that creates") }],
    items: [
      { title: L("Distribución uniforme.", "Uniform Distribution."), text: L("Un reparto constante de los agentes de curado en toda la profundidad del músculo es a la vez un requisito de calidad y un imperativo de seguridad alimentaria.", "Consistent curing agent distribution through the full muscle depth is both a quality requirement and a food safety imperative.") },
      { title: L("Reposo controlado.", "Controlled Resting."), text: L("Nuestra ingeniería de proceso define los parámetros exactos de temperatura, humedad y duración para cada producto, y MQConnect vigila cada variable durante todo el proceso y avisa de cualquier desviación antes de que se pierda un lote.", "Our process engineering defines the precise temperature, humidity, and duration parameters for each product, and MQConnect monitors every variable throughout, alerting to deviation before it becomes a batch loss.") },
      { title: L("Trazabilidad de la seguridad.", "Safety Traceability."), text: L("Trazabilidad digital completa de cada parámetro de curado por lote: concentración de nitritos, uniformidad de inyección, duración del reposo y curva de temperatura. Datos listos para auditoría que cumplen los requisitos más exigentes de seguridad alimentaria y de la distribución.", "Full digital traceability of every curing parameter per batch — nitrite concentration, injection uniformity, resting duration, temperature curve. Audit-ready data that satisfies the most demanding food safety and retailer compliance requirements.") },
      { title: L("Formado de precisión.", "Precision Forming."), text: L("La tecnología de embutido y formado de Metalquimia para productos curados mantiene la integridad estructural del músculo, clave en productos loncheados y porcionados donde la presentación y la exactitud de la porción no se negocian.", "Metalquimia's stuffing and forming technology for cured products maintains the structural integrity of the muscle, critical for sliced and portioned products where visual presentation and portion accuracy are non-negotiable.") },
    ],
  },
  partnership: {
    text: L("<p>La Creativación es la forma en que Metalquimia entiende la I+D: un proceso en el que el conocimiento profundo del proceso, la ciencia de los alimentos y la ingeniería mecánica se unen para crear soluciones que antes no existían.</p>", "<p>Creativation is Metalquimia's approach to R&D: a process where deep process knowledge, food science, and mechanical engineering converge to create solutions that didn't exist before.</p>"),
    button: link(L("Descubre nuestro modelo", "Discover our model"), "@page:partnership"),
  },
};

const snacks = {
  hero: {
    text: L(
      "QDSnacks® permite elaborar alimentos más saludables, ricos en proteína, bajos en hidratos de carbono y sin grasas trans, que ya están transformando el mercado mundial de la alimentación.",
      "QDSnacks® enables the production of healthier foods that are high in protein, low in carbohydrates, and free from trans fats, which are already transforming the global food market.",
    ),
  },
  steps: {
    eyebrow: L("INGENIERÍA DEL PROCESO DE SNACKS DE PRINCIPIO A FIN", "END-TO-END SNACK PROCESS ENGINEERING"),
    items: [
      [L("Preparación de la materia prima.", "Raw material preparation."), L("Acondicionamiento preciso del producto antes del corte, porque la calidad del snack empieza por la constancia de la materia prima.", "Precise conditioning of input product before cutting begins, because snack quality starts with raw material consistency.")],
      [L("Loncheado y corte de alta precisión.", "High-precision slicing and cutting."), L("El sistema QDS de Metalquimia consigue una geometría exacta a gran velocidad, manteniendo la tolerancia dimensional.", "Metalquimia's QDS System delivers exact geometry at high output speeds, maintaining dimensional tolerance.")],
      [L("Sazonado y recubrimiento.", "Seasoning and coating."), L("Aplicación controlada de especias secas, marinadas líquidas y sistemas de recubrimiento, con una presentación visual repetible en cada lote.", "Controlled application of dry rubs, liquid marinades, coating systems and repeatable visual presentation across every production run.")],
      [L("Secado y tratamiento térmico.", "Drying and thermal treatment."), L("Perfiles de secado y cocción específicos para snacks, diseñados para la actividad de agua, la textura y la vida útil objetivo, con control total durante todo el proceso térmico.", "Snack-specific drying and cooking profiles engineered for target water activity, texture, and shelf life with full control throughout the thermal process.")],
      [L("Control de peso y porción.", "Weight and portion control."), L("MQConnect integra en tiempo real los datos de peso del loncheado y el porcionado en un control de lazo cerrado, con trazabilidad completa de la producción.", "MQConnect integrates real-time weight data from slicing and portioning into a closed-loop control system, providing full production traceability.")],
    ].map(([lead, text], i) => ({ image: I.snacksSteps[i], lead, text })),
  },
  results: {
    eyebrow: L("APLICACIONES", "APPLICATIONS"),
    subtitle: L(
      "La nueva tecnología QDSnacks permite una versatilidad y flexibilidad universales, posibilidad de trabajar con todo tipo de formatos y matrices proteicas y el desarrollo acelerado de nuevos productos.",
      "The new QDSnacks technology offers universal versatility and flexibility, the ability to work with all kinds of formats and protein matrices, and accelerated new product development.",
    ),
    items: I.snacksPlates.map((image) => ({ image, lead: "", text: "", link: null })),
  },
  machines: {
    eyebrow: L("EQUIPOS PARA EL PROCESADO DE SNACKS", "EQUIPMENT FOR SNACK PROCESSING"),
    show_filters: false,
    items: [
      [I.machineDefroster, L("Descongelación de carne", "Meat Defrosting"), L("Masaje muy suave: producto descongelado de la máxima calidad", "Very gentle massage: thawed product of the highest quality")],
      [I.machineTumbler, L("QDSolutions - Fiambres y snacks", "QDSolutions - Deli Meats and Snacks"), L("Conectividad total 4.0: la curación del futuro.", "Total Connectivity 4.0: The Curation of the Future.")],
    ].map(([image, name, description]) => ({ image, name, category: "", description, link: link("", "@page:machine") })),
  },
  method: {
    eyebrow: L("INGENIERÍA DE MAQUINARIA DE PRIMER NIVEL", "TOP NOTCH MACHINE ENGINEERING"),
    image: I.snacksProducts[1],
    tags: [{ label: L("Partnership para toda la vida", "Partnership for life") }, { label: L("Dando forma al futuro de la alimentación", "Shaping the future of food") }, { label: L("Innovación que crea", "Innovation that creates") }],
    items: [
      { title: L("Precisión QDS.", "QDS Precision."), text: L("El sistema QDS es un invento de Metalquimia: una tecnología de corte y formado desarrollada específicamente para producir snacks cárnicos de alta precisión. Consigue una geometría exacta a velocidad industrial, con formatos de tolerancias dimensionales que marcan la calidad en el lineal y la exactitud de cada porción.", "The QDS System is a Metalquimia invention — a cutting and forming technology developed specifically for high-precision meat snack production. It delivers exact geometry at industrial speeds, enabling snack formats with dimensional tolerances that define shelf presentation quality and portion accuracy.") },
      { title: L("Velocidad sin desviaciones.", "Speed Without Drift."), text: L("Las líneas de snacks de gran producción tienden a desviarse dimensionalmente al aumentar la velocidad. Los sistemas de loncheado y formado de Metalquimia mantienen la precisión geométrica durante toda la producción, no solo al arrancar, gracias a la realimentación mecánica continua y al control de lazo cerrado.", "High-output snack lines are vulnerable to dimensional drift as line speed increases. Metalquimia's slicing and forming systems maintain geometric precision across the full production run — not just at startup — through continuous mechanical feedback and closed-loop control.") },
      { title: L("Flexibilidad de formatos.", "Format Flexibility."), text: L("Los equipos de la división Snacks están pensados para cambiar de formato rápidamente (grosores, geometrías y tamaños de porción distintos) sin paradas importantes. Clave para quien gestiona varias referencias en una sola línea o desarrolla nuevos formatos para su lanzamiento.", "The Snacks division equipment is designed for rapid format changeover — different thicknesses, geometries, and portion sizes without significant downtime. Critical for processors managing multiple SKUs on a single line, or developing new snack formats for retail launch.") },
      { title: L("Control del sobrepeso.", "Giveaway Control."), text: L("En la producción de snacks, el sobrepeso regalado es la principal variable de coste y la mayoría lo da por inevitable. El control de peso integrado de Metalquimia y el circuito de datos de MQConnect lo tratan como un problema de ingeniería, con objetivos de reducción medibles y alcanzables a escala industrial.", "In snack production, giveaway is the primary cost variable that most processors accept as unavoidable. Metalquimia's integrated weight control and MQConnect data loop treats it as an engineering problem — with measurable, achievable targets for reduction at production scale.") },
    ],
  },
  partnership: {
    text: L("<p>La Creativación es la forma en que Metalquimia entiende la I+D: un proceso en el que el conocimiento profundo del proceso, la ciencia de los alimentos y la ingeniería mecánica se unen para crear soluciones que antes no existían.</p>", "<p>Creativation is Metalquimia's approach to R&D: a process where deep process knowledge, food science, and mechanical engineering converge to create solutions that didn't exist before.</p>"),
    button: link(L("Descubre nuestro modelo", "Discover our model"), "@page:partnership"),
  },
};

const sausages = {
  hero: {
    // Figma: "Lorem". Texto provisional propio, no del Figma.
    text: L(
      "Equipos y tecnología para la elaboración de salchichas cocidas: embutición, cocción y control de cada lote para un calibre, un color y una textura idénticos.",
      "Equipment and technology for cooked sausage production: stuffing, cooking and control of every batch for identical calibre, colour and texture.",
    ),
  },
  steps: {
    eyebrow: L("INGENIERÍA DE PROCESO DE SNACKS DE PRINCIPIO A FIN", "END-TO-END SNACK PROCESS ENGINEERING"),
    items: [
      [L("Preparación de la materia prima.", "Raw material preparation."), L("Acondicionamiento preciso del producto antes del corte, porque la calidad del snack empieza por la constancia de la materia prima.", "Precise conditioning of input product before cutting begins, because snack quality starts with raw material consistency.")],
      [L("Loncheado y corte de alta precisión.", "High-precision slicing and cutting."), L("El sistema QDS de Metalquimia consigue una geometría exacta a gran velocidad, manteniendo la tolerancia dimensional.", "Metalquimia's QDS System delivers exact geometry at high output speeds, maintaining dimensional tolerance.")],
      [L("Sazonado y recubrimiento.", "Seasoning and coating."), L("Aplicación controlada de especias secas, marinados líquidos y sistemas de recubrimiento, con una presentación visual repetible en cada tanda de producción.", "Controlled application of dry rubs, liquid marinades, coating systems and repeatable visual presentation across every production run.")],
      [L("Secado y tratamiento térmico.", "Drying and thermal treatment."), L("Perfiles de secado y cocción específicos para snacks, diseñados para la actividad de agua, la textura y la vida útil deseadas, con control total durante todo el proceso térmico.", "Snack-specific drying and cooking profiles engineered for target water activity, texture, and shelf life, with full control throughout the thermal process.")],
      [L("Control de peso y porción.", "Weight and portion control."), L("MQConnect integra los datos de peso en tiempo real del loncheado y el porcionado en un sistema de control en lazo cerrado, con trazabilidad completa de la producción.", "MQConnect integrates real-time weight data from slicing and portioning into a closed-loop control system, providing full production traceability.")],
    ].map(([lead, text], i) => ({ image: I.sausagesSteps[i], lead, text })),
  },
  results: {
    eyebrow: L("APLICACIONES", "APPLICATIONS"),
    title_muted: "",
    // Figma: el subtítulo ya venía en español.
    subtitle: L(
      "La nueva tecnología QDSnacks permite una versatilidad y flexibilidad universales, posibilidad de trabajar con todo tipo de formatos y matrices proteicas y el desarrollo acelerado de nuevos productos.",
      "The new QDSnacks technology brings universal versatility and flexibility, the ability to work with all kinds of formats and protein matrices, and faster development of new products.",
    ),
    // Figma: etiquetas de Marinados en las tarjetas (placeholder) → sin texto.
    items: I.sausagesPlates.map((image) => ({ image, lead: "", text: "", link: null })),
  },
  machines: {
    eyebrow: L("EQUIPOS PARA EL PROCESADO DE SALCHICHAS", "EQUIPMENT FOR SAUSAGE PROCESSING"),
    show_filters: false,
    items: [
      [I.machineDefroster, L("Descongelación de carne", "Meat Defrosting"), L("Masaje muy suave: producto descongelado de la máxima calidad", "Very gentle massage: thawed product of the highest quality")],
      [I.machineTumbler, L("Cocción de carne", "Meat Cooking"), L("Cocción inteligente con monitorización y registro de todos los parámetros técnicos del proceso", "Smart cooking with monitoring and recording of all technical parameters of the process")],
      [I.machineInjector, L("Salchichas cocidas", "Cooked sausages"), L("Máximo rendimiento del producto y flexibilidad operativa", "Maximize product performance and operational flexibility")],
    ].map(([image, name, description]) => ({ image, name, category: "", description, link: link("", "@page:machine") })),
  },
  method: {
    eyebrow: L("INGENIERÍA DE MAQUINARIA DE PRIMER NIVEL", "TOP NOTCH MACHINE ENGINEERING"),
    image: I.sausagesHighlight,
    tags: [{ label: L("Partnership para toda la vida", "Partnership for life") }, { label: L("Dando forma al futuro de la alimentación", "Shaping the future of food") }, { label: L("Innovación que crea", "Innovation that creates") }],
    items: [
      { title: L("Precisión QDS.", "QDS Precision."), text: L("El sistema QDS es un invento de Metalquimia: una tecnología de corte y formado desarrollada específicamente para la producción de snacks cárnicos de alta precisión. Consigue una geometría exacta a velocidad industrial y permite formatos con tolerancias dimensionales que definen la presentación en el lineal y la exactitud de cada porción.", "The QDS System is a Metalquimia invention — a cutting and forming technology developed specifically for high-precision meat snack production. It delivers exact geometry at industrial speeds, enabling snack formats with dimensional tolerances that define shelf presentation quality and portion accuracy.") },
      { title: L("Velocidad sin desviaciones.", "Speed Without Drift."), text: L("Las líneas de snacks de alta producción son vulnerables a la deriva dimensional a medida que aumenta la velocidad. Los sistemas de loncheado y formado de Metalquimia mantienen la precisión geométrica durante toda la producción, no solo al arrancar, gracias a la realimentación mecánica continua y al control en lazo cerrado.", "High-output snack lines are vulnerable to dimensional drift as line speed increases. Metalquimia's slicing and forming systems maintain geometric precision across the full production run — not just at startup — through continuous mechanical feedback and closed-loop control.") },
      { title: L("Flexibilidad de formato.", "Format Flexibility."), text: L("Los equipos de la división de Snacks están pensados para cambiar de formato rápidamente —distintos grosores, geometrías y porciones— sin paradas significativas. Algo clave para quien gestiona varias referencias en una sola línea o desarrolla nuevos formatos de snack para su lanzamiento en distribución.", "The Snacks division equipment is designed for rapid format changeover — different thicknesses, geometries, and portion sizes without significant downtime. Critical for processors managing multiple SKUs on a single line, or developing new snack formats for retail launch.") },
      { title: L("Control del sobrepeso.", "Giveaway Control."), text: L("En la producción de snacks, el sobrepeso regalado es la principal variable de coste que la mayoría de fabricantes da por inevitable. El control de peso integrado de Metalquimia y el lazo de datos de MQConnect lo tratan como un problema de ingeniería, con objetivos de reducción medibles y alcanzables a escala de producción.", "In snack production, giveaway is the primary cost variable that most processors accept as unavoidable. Metalquimia's integrated weight control and MQConnect data loop treats it as an engineering problem — with measurable, achievable targets for reduction at production scale.") },
    ],
  },
  partnership: {
    text: L("<p>La Creativación es la forma en que Metalquimia entiende la I+D: un proceso en el que el conocimiento profundo del proceso, la ciencia de los alimentos y la ingeniería mecánica se unen para crear soluciones que antes no existían.</p>", "<p>Creativation is Metalquimia's approach to R&D: a process where deep process knowledge, food science, and mechanical engineering converge to create solutions that didn't exist before.</p>"),
    button: link(L("Descubre nuestro modelo", "Discover our model"), "@page:partnership"),
  },
};

const petfood = {
  hero: {
    // El hero del Figma no tiene párrafo: solo título y botón.
    text: "",
  },
  steps: {
    eyebrow: L("INGENIERÍA DE PROCESO DE SNACKS DE PRINCIPIO A FIN", "END-TO-END SNACK PROCESS ENGINEERING"),
    items: [
      [L("Preparación de la materia prima.", "Raw material preparation."), L("Acondicionamiento preciso del producto antes del corte, porque la calidad del snack empieza por la regularidad de la materia prima.", "Precise conditioning of input product before cutting begins, because snack quality starts with raw material consistency.")],
      [L("Loncheado y corte de alta precisión.", "High-precision slicing and cutting."), L("El sistema QDS de Metalquimia consigue una geometría exacta a gran velocidad, manteniendo la tolerancia dimensional.", "Metalquimia's QDS System delivers exact geometry at high output speeds, maintaining dimensional tolerance.")],
      [L("Sazonado y recubrimiento.", "Seasoning and coating."), L("Aplicación controlada de especias secas, marinados líquidos y sistemas de recubrimiento, con una presentación visual repetible en cada lote.", "Controlled application of dry rubs, liquid marinades, coating systems and repeatable visual presentation across every production run.")],
      [L("Secado y tratamiento térmico.", "Drying and thermal treatment."), L("Perfiles de secado y cocción específicos para snacks, pensados para la actividad de agua, la textura y la vida útil objetivo, con control total de todo el proceso térmico.", "Snack-specific drying and cooking profiles engineered for target water activity, texture, and shelf life, with full control throughout the thermal process.")],
      [L("Control de peso y porción.", "Weight and portion control."), L("MQConnect integra en tiempo real los datos de peso del loncheado y el porcionado en un sistema de control en lazo cerrado, con trazabilidad completa de la producción.", "MQConnect integrates real-time weight data from slicing and portioning into a closed-loop control system, providing full production traceability.")],
    ].map(([lead, text], i) => ({ image: I.petfoodSteps[i], lead, text })),
  },
  results: {
    eyebrow: L("APLICACIONES", "APPLICATIONS"),
    // Título en dos líneas, todo en blanco (sin parte gris).
    title_muted: "",
    // El subtítulo del Figma ya viene en español en los dos idiomas.
    subtitle: L(
      "La nueva tecnología QDSnacks permite una versatilidad y flexibilidad universales, posibilidad de trabajar con todo tipo de formatos y matrices proteicas y el desarrollo acelerado de nuevos productos.",
      "The new QDSnacks technology brings universal versatility and flexibility, the ability to work with all kinds of formats and protein matrices, and faster development of new products.",
    ),
    // Las etiquetas de las tarjetas parecen de relleno (marinados): se dejan sin texto, como en Cocidos.
    items: I.petfoodPlates.map((image) => ({ image, lead: "", text: "", link: null })),
  },
  machines: {
    eyebrow: L("EQUIPOS PARA EL PROCESADO DE PET FOOD", "EQUIPMENT FOR PET FOOD PROCESSING"),
    show_filters: false,
    // Solo 3 máquinas (una fila), con las mismas imágenes que Cocidos.
    items: [
      [I.machineDefroster, L("Descongelación de carne", "Meat Defrosting"), L("Masaje muy suave: producto descongelado de la máxima calidad", "Very gentle massage: thawed product of the highest quality")],
      [I.machineTumbler, L("QDSolutions - Fiambres y snacks", "QDSolutions - Deli Meats and Snacks"), L("Conectividad total 4.0: la curación del futuro.", "Total Connectivity 4.0: The Curation of the Future.")],
      [I.machineInjector, "Pet food", L("Máximo rendimiento del producto y flexibilidad operativa", "Maximize product performance and operational flexibility")],
    ].map(([image, name, description]) => ({ image, name, category: "", description, link: link("", "@page:machine") })),
  },
  method: {
    eyebrow: L("INGENIERÍA DE MAQUINARIA DE PRIMER NIVEL", "TOP NOTCH MACHINE ENGINEERING"),
    image: I.petfoodProducts[0],
    tags: [{ label: L("Partnership para toda la vida", "Partnership for life") }, { label: L("Dando forma al futuro de la alimentación", "Shaping the future of food") }, { label: L("Innovación que crea", "Innovation that creates") }],
    items: [
      { title: L("Precisión QDS.", "QDS Precision."), text: L("El sistema QDS es un invento de Metalquimia: una tecnología de corte y formado desarrollada específicamente para producir snacks cárnicos de alta precisión. Consigue una geometría exacta a velocidad industrial, con tolerancias dimensionales que definen la presentación en el lineal y la exactitud de cada porción.", "The QDS System is a Metalquimia invention — a cutting and forming technology developed specifically for high-precision meat snack production. It delivers exact geometry at industrial speeds, enabling snack formats with dimensional tolerances that define shelf presentation quality and portion accuracy.") },
      { title: L("Velocidad sin desviaciones.", "Speed Without Drift."), text: L("Las líneas de snacks de alta producción tienden a desviarse dimensionalmente al subir la velocidad. Los sistemas de loncheado y formado de Metalquimia mantienen la precisión geométrica durante toda la producción, no solo al arrancar, gracias a la realimentación mecánica continua y al control en lazo cerrado.", "High-output snack lines are vulnerable to dimensional drift as line speed increases. Metalquimia's slicing and forming systems maintain geometric precision across the full production run — not just at startup — through continuous mechanical feedback and closed-loop control.") },
      { title: L("Flexibilidad de formatos.", "Format Flexibility."), text: L("Los equipos de la división Snacks están pensados para cambiar de formato rápidamente: distintos grosores, geometrías y tamaños de porción sin grandes paradas. Clave para quien produce varias referencias en una sola línea o desarrolla nuevos formatos de snack para su lanzamiento.", "The Snacks division equipment is designed for rapid format changeover — different thicknesses, geometries, and portion sizes without significant downtime. Critical for processors managing multiple SKUs on a single line, or developing new snack formats for retail launch.") },
      { title: L("Control del sobrepeso.", "Giveaway Control."), text: L("En la producción de snacks, el sobrepeso es la principal variable de coste que la mayoría de fabricantes da por inevitable. El control de peso integrado de Metalquimia y el circuito de datos de MQConnect lo tratan como un problema de ingeniería, con objetivos de reducción medibles y alcanzables a escala industrial.", "In snack production, giveaway is the primary cost variable that most processors accept as unavoidable. Metalquimia's integrated weight control and MQConnect data loop treats it as an engineering problem — with measurable, achievable targets for reduction at production scale.") },
    ],
  },
  partnership: {
    // Imagen: la misma foto de I.partner (hombre de traje junto a la máquina).
    text: L("<p>La Creativación es la forma en que Metalquimia entiende la I+D: un proceso en el que el conocimiento profundo del proceso, la ciencia de los alimentos y la ingeniería mecánica se unen para crear soluciones que antes no existían.</p>", "<p>Creativation is Metalquimia's approach to R&D: a process where deep process knowledge, food science, and mechanical engineering converge to create solutions that didn't exist before.</p>"),
    button: link(L("Descubre nuestro modelo", "Discover our model"), "@page:partnership"),
  },
};

// ---------- Páginas de máquina (Figma Páginas › Página de máquina 193:4073) ----------
// Misma plantilla para todas las inyectoras de la categoría Inyección de carne. Textos del Figma (Movistick Triplex)
// y, para el resto, de las fichas de metalquimia.com.
const machinePage = ({ key, slug, name, image, subtitle, intro, characteristics }) => ({
  key,
  parent: "meat-injection",
  es: { title: name, slug },
  en: { title: name, slug },
  sections: [
    {
      type: "product_hero",
      image,
      title: name,
      subtitle,
      card_image: "",
      card_text: L("Pide más información sobre este producto", "Get more information about this product"),
      card_button: link(L("SOLICITA INFORMACIÓN", "REQUEST INFORMATION"), "@page:contact#form"),
    },
    { type: "product_intro", image: I.productIntro, text: intro },
    {
      type: "characteristics",
      eyebrow: L("EL PRODUCTO", "THE PRODUCT"),
      title: L("Características principales", "Main characteristics"),
      items: characteristics.map((text) => ({ text })),
      button: link(L("SOLICITA INFORMACIÓN", "REQUEST INFORMATION"), "@page:contact#form"),
      file: "",
      button_label: L("DESCARGAR FICHA", "DOWNLOAD DATASHEET"),
    },
    engineeringMethod(),
    {
      type: "products_highlight",
      eyebrow: L("¿QUÉ HACEMOS? REDEFINIR LO ESTÁNDAR", "WHAT WE DO? REDEFINING WHAT’S STANDARD"),
      title_muted: L("Diseñado para el proceso.", "Engineered for the process."),
      title: L("Construido para durar.", "Built for the long run."),
      subtitle: L("Diseñamos y fabricamos equipos y tecnología de proceso para la elaboración de productos cárnicos y/o a base de proteínas.", "We design and manufacture equipment and process technology for the production of meat and/or protein-based products."),
      button: null,
      // Sin categorías no salen pestañas: queda el carrusel solo, como en el Figma.
      show_filters: true,
      all_label: L("TODOS", "ALL"),
      items: [0, 1].flatMap(() =>
        [
          [I.m1, L("Inyectoras de carne", "Meat Injectors"), L("Tecnología de inyección por spray diseñada desde cero para el máximo reparto de la salmuera, el mínimo daño al producto y resultados constantes a escala industrial.", "Spray injection technology engineered from scratch for maximum brine distribution, minimal product damage, and consistent results at industrial scale."), "@page:meat-injection"],
          [I.m2, L("Descongelación de carne", "Meat Defrosting"), L("Descongelación de precisión que conserva la textura, reduce al mínimo la pérdida por goteo y mantiene la línea en marcha, sin comprometer la seguridad alimentaria ni la producción.", "Precision-controlled thawing that preserves texture, minimises drip loss, and keeps your line running — without compromising food safety or throughput."), "#"],
          [I.m3, L("Embutidoras de carne", "Meat Stuffers"), L("Pensadas para las máximas exigencias de rendimiento, higiene y continuidad de producción, sin comprometer la seguridad alimentaria ni la producción.", "Built for the highest demands in yield, hygiene, and production continuity without compromising food safety or throughput."), "#"],
        ].map(([image, name, description, url]) => ({ image, name, category: "", description, link: link("", url) })),
      ),
    },
  ],
});

const machinePages = [
  machinePage({
    key: "machine-classic",
    slug: "movistick-classic",
    name: "Movistick Classic",
    image: I.movistickClassic,
    subtitle: L("Distribución uniforme de la salmuera y máxima precisión en la inyección de carne.", "Uniform distribution of brine and maximum precision in meat injection."),
    intro: L(
      "Las inyectoras MOVISTICK CLASSIC son máquinas totalmente hidráulicas y autopilotadas, con la bomba de salmuera incorporada, que inyectan la salmuera a presión constante a través de múltiples orificios y consiguen un reparto uniforme, sin zonas muertas, en carne con o sin hueso.\n\nSus sistemas de filtrado independientes o el filtro automático autolimpiable opcional permiten trabajar 24 horas sin paradas con todo tipo de salmueras.",
      "MOVISTICK CLASSIC injectors are fully hydraulic, self-piloted machines with a built-in brine pump that inject brine at constant pressure through multiple holes, achieving a uniform distribution with no dead zones in boneless or bone-in meat.\n\nIndependent filtering systems or the optional self-cleaning automatic filter allow 24-hour non-stop operation with all types of brines.",
    ),
    characteristics: [
      L("Amplio margen de porcentajes de inyección.", "Wide range of injection percentages."),
      L("Mínimo goteo de salmuera.", "Minimal brine drainage."),
      L("Mejor reparto de la salmuera en el músculo.", "Better distribution of brine within the muscle."),
      L("Máxima precisión de inyección.", "Maximum injection precision."),
      L("Inyección regulable.", "Adjustable injection."),
      L("Inyección de ingredientes insolubles dispersos.", "Injection of dispersed insoluble ingredients."),
      L("Agujas intercambiables según el tipo de carne.", "Interchangeable needles depending on the type of meat."),
      L("Para inyección con hueso (modelos CR) / sin hueso.", "For injection with bone (CR models) / without bone."),
      L("Cabezal tenderizador opcional (según modelo).", "Optional tenderizer head (depending on model)."),
      L("Mayor rendimiento final.", "Higher final yield."),
      L("Diseño higiénico orientado a la seguridad alimentaria.", "Hygienic design focused on food safety."),
      L("Dispositivo UP&DOWN opcional (excepto modelos CR).", "Optional UP&DOWN device (except CR models)."),
      L("Regulación opcional de la presión de inyección por efecto spray.", "Optional injection pressure regulation by spray effect."),
    ],
  }),
  machinePage({
    key: "machine",
    slug: "movistick-triplex",
    name: "Movistick Triplex",
    image: I.movistickTriplex,
    subtitle: L("La MOVISTICK TRIPLEX es la inyectora hidráulica autopilotada que incorpora hasta 3 cabezales de inyección.", "The MOVISTICK TRIPLEX is the self-piloted hydraulic injector that incorporates up to 3 injection heads."),
    intro: L(
      "Sin duda, la inyectora para productos cárnicos (con o sin hueso) con mayor potencial de inyección del sector cárnico mundial. Equipada con una bomba hidráulica de triple pistón, ofrece los mayores índices de productividad del mercado y los mejores rendimientos finales con la máxima precisión de inyección, con un reparto espectacular de la salmuera y uniformidad de color, para responder a los exigentes retos exponenciales de la industria cárnica del futuro.\n\nEl diseño único de sus cabezales permite inyectar productos con avances de cinta de hasta 120 mm, lo que se traduce en una gran capacidad de producción.",
      "Without a doubt, the injector for meat products (with or without bones) with the greatest injection potential in the global meat sector, equipped with a triple hydraulic piston pump, provides the highest productivity rates in the market and the best final yields with maximum injection precision, achieving a spectacular distribution of brine and color uniformity, thus addressing the demanding exponential challenges of the future meat industry.\n\nThe unique design of its heads allows for the injection of products with conveyor advances of up to 120 mm, resulting in a high production capacity.",
    ),
    characteristics: [
      L("Inyección regulable del 15 al 160 % por pasada según el tipo de carne.", "Adjustable injection from 15 to 160% per pass depending on the type of meat."),
      L("Reparto uniforme de la salmuera sin zonas muertas.", "Uniform distribution of brine with no dead zones."),
      L("Inyección de ingredientes insolubles dispersos.", "Injection of dispersed insoluble ingredients."),
      L("Mínimo goteo de salmuera.", "Minimal brine drainage."),
      L("Filtro automático autolimpiable opcional, pensado para trabajar 24 horas sin paradas con todo tipo de salmueras.", "Optional self-cleaning automatic filter, specially designed to operate 24 hours without stops with all types of brines."),
      L("Para inyección con hueso (modelos CR) / sin hueso.", "For injection with bone (CR models) / without bone."),
      L("Autopilotada totalmente hidráulica, bombas de salmuera incluidas.", "Fully hydraulic autopilot, including brine pumps."),
      L("Tres cabezales de agujas alternativos para una inyección exponencial.", "Three alternative needle heads for exponential injection."),
      L("Cabezales de doble funcionamiento: triple o doble cabezal.", "Heads with dual operation: Triple or Double Head operation."),
      L("Dispositivo de regulación de la presión de inyección por efecto spray.", "Injection Pressure Regulation Device by Spray Effect."),
      L("Separación optimizada entre cabezales para piezas de gran longitud.", "Optimized spacing between heads for long dimension pieces."),
      L("Cinta de transporte tipo SINGER.", "SINGER type transport belt."),
      L("Soporte independiente para cada grupo de agujas.", "Independent holder for each group of needles."),
      L("Aprovechamiento total de la salmuera.", "Total utilization of brine."),
      L("Máxima facilidad de mantenimiento, limpieza y desinfección.", "Maximum ease of maintenance, cleaning, and disinfection."),
    ],
  }),
  machinePage({
    key: "machine-signature",
    slug: "moviplus-4-0-signature-edition",
    name: "Moviplus 4.0 Signature Edition",
    image: I.moviplusSignature,
    subtitle: L("La inyección, lo siguiente: excelencia en diseño inteligente.", "Injection Molding, the Next: Excellence in Smart Design."),
    intro: L(
      "La MOVIPLUS 4.0 Signature Edition forma parte de la línea Signature de Metalquimia, junto con el reactor de masaje TURBOMEAT 4.0 y la embutidora automática de músculo entero TWINVAC 4.0, galardonada con el Red Dot Award 2019 de diseño industrial.\n\nUne conectividad 4.0 total, un sistema de inyección autorregulado y la tecnología SPRAYPLUS® en un diseño inteligente e higiénico, pensado para la máxima productividad.",
      "The MOVIPLUS 4.0 Signature Edition is part of Metalquimia's Signature line, together with the TURBOMEAT 4.0 massage reactor and the TWINVAC 4.0 automatic whole muscle stuffer, winner of the 2019 Red Dot Award for industrial design.\n\nIt brings together total 4.0 connectivity, a self-regulating injection system and SPRAYPLUS® technology in a smart, hygienic design built for maximum productivity.",
    ),
    characteristics: [
      L("Conectividad 4.0 total: la inyección del futuro.", "Total 4.0 connectivity: the injection of the future."),
      L("Sistema de inyección autorregulado: precisión incomparable.", "Self-regulating injection system: incomparable precision."),
      L("Tecnología SPRAYPLUS®: reparto de la salmuera inmejorable.", "SPRAYPLUS® technology: unbeatable brine distribution."),
      L("Más ciclos de trabajo: mayor productividad.", "More operating cycles: higher productivity."),
      L("Diseño inteligente e higiénico: Signature Edition.", "Smart & hygienic design: Signature Edition."),
      L("Red Dot Award 2019 al diseño industrial.", "2019 Red Dot Award for industrial design."),
    ],
  }),
  machinePage({
    key: "machine-moviplus",
    slug: "moviplus-4-0",
    name: "Moviplus 4.0",
    image: I.moviplus40,
    subtitle: L("La nueva versión 4.0 de la Moviplus, diseñada especialmente para la ciberindustria del futuro.", "The new Moviplus version 4.0 has been specially designed for the cyber-industry of the future."),
    intro: L(
      "La MOVIPLUS 4.0 inyecta la salmuera a presión constante en cualquier tipo de carne sin hueso (cerdo, vacuno, aves…) con su sistema spray inteligente, y consigue un reparto uniforme de la salmuera y del color, una gran productividad y los mejores rendimientos finales.\n\nLa inyección es regulable del 10 al 100 % por pasada, según el modelo y el tipo de carne.",
      "The MOVIPLUS 4.0 injects brine at constant pressure into any type of boneless meat (pork, beef, poultry…) with its smart spray system, achieving a uniform distribution of brine and colour, high productivity and the best final yields.\n\nInjection is adjustable from 10 to 100% per pass, depending on the model and the type of meat.",
    ),
    characteristics: [
      L("Funcionamiento electrohidráulico controlado por autómata y pantalla táctil.", "Electro-hydraulic operation controlled by PLC and touch screen."),
      L("Ciclos de trabajo más largos para una mayor productividad.", "Longer operating cycles for higher productivity."),
      L("Selección de inyección con uno o dos cabezales.", "Single or double head injection selection."),
      L("Separación regulable entre cabezales para una inyección diferencial.", "Adjustable spacing between heads for differential injection."),
      L("Cabezal tenderizador regulable en ciclos para una mayor extracción de proteína.", "Cycle-adjustable tenderizer head for greater protein extraction."),
      L("Regulación de la presión de inyección por efecto spray.", "Injection pressure regulation by spray effect."),
      L("Tecnología de reparto SPRAYPLUS® opcional.", "Optional SPRAYPLUS® distribution technology."),
      L("Sistema UP&DOWN opcional para productos con corteza.", "Optional UP&DOWN system for skin-on products."),
      L("Para inyección con hueso (modelos CR) / sin hueso.", "For injection with bone (CR models) / without bone."),
      L("Agujas fáciles de extraer para su control, limpieza y desinfección.", "Easy-to-extract needles for control, cleaning and disinfection."),
      L("Diseño higiénico orientado a la seguridad alimentaria.", "Hygienic design focused on food safety."),
      L("Agujas flexibles con «efecto memoria».", "Flexible “memory effect” needles."),
      L("Accesorio opcional: sistema de autorregulación de la inyección DYNAMIC INJECT CONTROL.", "Optional accessory: DYNAMIC INJECT CONTROL self-regulating injection system."),
    ],
  }),
  machinePage({
    key: "machine-moviplus-e",
    slug: "moviplus-e",
    name: "Moviplus-E",
    image: I.moviplusE,
    subtitle: L("Nueva línea de inyectoras de carne con accionamiento totalmente eléctrico.", "New line of meat injectors with a fully electric drive system."),
    intro: L(
      "Las nuevas inyectoras MOVIPLUS-e son la apuesta definitiva por una inyección de carne sostenible: su accionamiento totalmente eléctrico y la sencillez tecnológica de todos sus componentes se traducen en eficiencia energética, ahorro de salmuera, productividad, reciclabilidad y un mantenimiento mínimo.\n\nSu cabezal de inyección por efecto spray ofrece un reparto de la salmuera y una uniformidad de color sin rival, con gran versatilidad de porcentajes, un goteo mínimo y los mejores rendimientos finales.",
      "The new MOVIPLUS-e injectors are the ultimate commitment to sustainable meat injection: their fully electric drive system and the technological simplicity of all their components bring energy efficiency, brine savings, productivity, recyclability and minimal maintenance.\n\nIts spray-effect injection head provides unrivalled brine distribution and colour uniformity, with wide versatility of injection percentages, minimal drip loss and the best final yields.",
    ),
    characteristics: [
      L("Funcionamiento totalmente eléctrico controlado por PLC y pantalla.", "Fully electric operation controlled by PLC and display."),
      L("Todos los movimientos con servomotores = mayor precisión.", "All movements with servomotors = greater precision."),
      L("Tecnología SPRAYPLUS® para optimizar el reparto.", "SPRAYPLUS® technology to optimise distribution."),
      L("Sistema UP&DOWN para productos con corteza.", "UP&DOWN system for skin-on products."),
      L("Dispositivo de regulación de la presión de inyección por efecto spray.", "Injection pressure regulation device by spray effect."),
      L("Agujas flexibles «efecto memoria» con retorno a la posición original.", "Flexible “memory effect” needles that return to their original position."),
      L("Para inyección con hueso / sin hueso.", "For injection with bone / without bone."),
      L("Sistema de conectividad inteligente MQConnect incorporado.", "Built-in MQConnect smart connectivity system."),
      L("Accesorio opcional: sistema de autorregulación de la inyección DYNAMIC INJECT CONTROL.", "Optional accessory: DYNAMIC INJECT CONTROL self-regulating injection system."),
    ],
  }),
  machinePage({
    key: "machine-movimax",
    slug: "movimax-zero",
    name: "Movimax Zero",
    image: I.movimaxZero,
    subtitle: L("La inyectora de carne con menor huella de carbono del mercado.", "The Carbon-Neutral Meat Injector."),
    intro: L(
      "La Movimax Zero 5500 es la inyectora con menor huella de carbono del mercado. Con dos cabezales y 3.312 puntos de inyección spray, su bomba de doble servopistón volumétrico ofrece la máxima eficiencia energética, precisión de inyección y una temperatura de emisión reducida sin competencia.\n\nAdemás, el rediseño completo de todo el sistema de inyección y filtrado reduce al mínimo la salmuera sobrante tras cada lote (Zero Waste), y la tecnología de sus cabezales logra un reparto de la salmuera y una uniformidad de color sin rival en el mercado.",
      "The Movimax Zero 5500 is the lowest carbon footprint injector on the market. Equipped with two heads and 3,312 spray injection points, its double volumetric servo-piston pump provides maximum energy efficiency, injection precision and reduced emission temperatures without competition.\n\nA complete redesign of the entire injection and filtering system also minimises the excess brine after each batch (Zero Waste), and its head technology provides brine distribution and colour uniformity without competition in the market.",
    ),
    characteristics: [
      L("Funcionamiento totalmente eléctrico controlado por PLC y pantalla.", "Fully electric operation controlled by PLC and display."),
      L("Todos los movimientos con servomotores = mayor precisión.", "All movements with servomotors = greater precision."),
      L("Circuito de salmuera reducido.", "Reduced brine circuit."),
      L("Mayor aprovechamiento de la salmuera (Zero Waste).", "Greater use of brine (Zero Waste)."),
      L("Filtro de banda integrado = menos espacio alrededor de la máquina.", "Built-in band filter = less space needed around the machine."),
      L("Extracción lateral del filtro para su limpieza y desinfección.", "Lateral filter extraction for cleaning and disinfection."),
      L("Selección del modo de trabajo: un cabezal, dos cabezales o solo cinta.", "Work mode selection: one head, two heads or belt only."),
      L("Cabezal tenderizador regulable en ciclos.", "Cycle-adjustable tenderizer head."),
      L("Posibilidad de trabajar solo con el cabezal tenderizador (opcional).", "Option to work with the tenderizer head only (optional)."),
      L("Sistema UP&DOWN para productos con corteza, regulable en cuatro posiciones: 0, 4, 8 y 12 mm.", "UP&DOWN system for skin-on products, adjustable in four positions: 0, 4, 8 and 12 mm."),
      L("Dispositivo de regulación de la presión de inyección por efecto spray.", "Injection pressure regulation device by spray effect."),
      L("Agujas «efecto memoria» con retorno a la posición original.", "“Memory effect” needles that return to their original position."),
      L("Inyección con hueso y sin hueso (según modelo).", "Injection with and without bone (depending on model)."),
      L("Accesorio opcional: sistema de autorregulación de la inyección DYNAMIC INJECT CONTROL.", "Optional accessory: DYNAMIC INJECT CONTROL self-regulating injection system."),
      L("Sistema de conectividad inteligente MQConnect incorporado.", "Built-in MQConnect smart connectivity system."),
    ],
  }),
];

/** Página de cada máquina por su nombre (tarjetas de la categoría Inyección de carne). */
const machineKey = Object.fromEntries(machinePages.map((p) => [p.es.title.toLowerCase(), p.key]));

// ---------- Páginas ----------
export const pages = [
  {
    key: "home",
    front: true,
    es: { title: "Inicio", slug: "inicio", seo_title: "Metalquimia · Ingeniería para la industria cárnica", seo_description: "Tecnología y maquinaria para el procesado de carne y proteínas." },
    en: { title: "Home", slug: "home", seo_title: "Metalquimia · Engineering for the meat industry", seo_description: "Technology and machinery for meat and protein processing." },
    sections: [
      { type: "hero", image: I.heroHomePoster, image_mobile: "", video: I.heroHomeVideo, title: L("El socio foodtech y de ingeniería\npara la industria cárnica y de proteínas", "The foodtech & engineering partner\nfor the meat and protein industry"), button: link(L("CONTÁCTANOS", "CONTACT US"), "@page:contact") },
      logos(L("Con la confianza de las principales empresas cárnicas del mundo.", "Trusted by leading meat processing companies globally.")),
      {
        type: "products",
        eyebrow: L("NUESTRAS SOLUCIONES", "OUR SOLUTIONS"),
        title_muted: L("Procesado con precisión y", "Processed with precision and"),
        title: L("control total en cada etapa.\nTransformamos cómo el mundo procesa la carne.", "full control at every stage.\nWe transform how the world processes meat."),
        button: link(L("SABER MÁS", "LEARN MORE"), "@page:solutions"),
        categories: [
          ["Cooked", I.ham, "cooked", I.hamFrames],
          ["Marinated", I.marinated, "marinated"],
          ["Cured", I.salami, "cured"],
          ["Snacks", I.snacks, "snacks"],
          ["Sausages", I.sausages, "sausages"],
          ["Pet food", I.petfood, "petfood"],
        ].map(([name, image, key, frames = []]) => ({
          name,
          image,
          frames,
          processes: [
            L("PREPARACIÓN DE SALMUERA", "BRINE PREPARATION"),
            L("DESCONGELACIÓN DE BLOQUES DE CARNE", "MEAT BLOCK DEFROSTING"),
            L("JAMÓN COCIDO DE MÚSCULO ENTERO", "WHOLE MUSCLE COOKED HAM"),
            L("PALETA COCIDA DE MÚSCULO ENTERO", "WHOLE MUSCLE COOKED SHOULDER"),
            L("ELABORACIÓN DE BACON", "BACON PRODUCTION"),
            L("COCCIÓN DE SALCHICHAS", "SAUSAGE COOKING"),
            L("COCCIÓN DE PRODUCTOS SOUS-VIDE", "SOUS-VIDE COOKING"),
            L("PLANTAS AUTOMÁTICAS CON CONECTIVIDAD 4.0", "AUTOMATED PLANTS WITH 4.0 CONNECTIVITY"),
          ].map((label) => ({ label, link: link("", `@page:${key}`), thumbnail: "" })),
        })),
      },
      { type: "gradient_divider", direction: "down" },
      {
        ...method(false, I.highlightMachine),
        eyebrow: L("INGENIERÍA DE MAQUINARIA DE PRIMER NIVEL", "TOP NOTCH MACHINE ENGINEERING"),
        // Cada etiqueta abre su propia ventana (Figma 446:35255).
        tags: [
          {
            label: L("Partnership para toda la vida", "Partnership for life"),
            title: L("Partnership para toda la vida", "Partnership for life"),
            text: L(
              "Creamos la tecnología. Por eso somos los únicos que podemos hacerla evolucionar contigo de verdad. Nuestro compromiso no termina con la entrega: empieza ahí.\n\nSoporte de ingeniería, optimización de procesos y mejora continua, durante todo el tiempo que trabajes con nuestros equipos.",
              "We created the technology. That's why we're the only ones who can truly evolve it with you. Our commitment doesn't end at delivery — it starts there.\n\nEngineering support, process optimization, and continuous upgrade, for as long as you run our equipment.",
            ),
            button: link(L("Descubre nuestro modelo", "Discover our model"), "@page:partnership"),
            image: I.partner,
          },
          {
            label: L("Dando forma al futuro de la alimentación", "Shaping the future of food"),
            title: L("Dando forma al futuro de la alimentación", "Shaping the future of food"),
            text: L(
              "Nuestro Centro Global de Investigación y Tecnología cárnica trabaja con cada cliente para desarrollar nuevos productos y mejorar los que ya tiene.\n\nProteínas alternativas, recetas más limpias y procesos más eficientes, probados en planta piloto antes de llegar a tu línea.",
              "Our Global Meat Research and Technology Center works with every customer to develop new products and improve existing ones.\n\nAlternative proteins, cleaner recipes and more efficient processes, proven in our pilot plant before they reach your line.",
            ),
            button: link(L("Conoce el centro", "Visit the center"), "@page:innovation"),
            image: I.lab,
          },
          {
            label: L("Innovación que crea", "Innovation that creates"),
            title: L("Innovación que crea", "Innovation that creates"),
            text: L(
              "Somos dueños de cada tecnología crítica de nuestros equipos. Diseñamos, patentamos y fabricamos cada componente.\n\nEso significa actualizaciones más rápidas, un conocimiento más profundo del proceso y una línea que evoluciona sin empezar de cero.",
              "We own every critical technology in our equipment. We design, patent and build every component.\n\nThat means faster upgrades, deeper process knowledge and a line that evolves without starting from scratch.",
            ),
            button: link(L("Nuestra tecnología", "Our technology"), "@page:technologies"),
            image: I.engineer,
          },
        ],
        items: [
          {
            title: L("Somos expertos en investigación y desarrollo de vanguardia en tecnología cárnica, con soluciones innovadoras y las mejores prácticas del sector.", "We are experts in cutting-edge research and development in meat technology, dedicated to innovative solutions and industry-leading practices."),
            text: L("Ponemos a disposición de nuestros clientes un Centro Global de Investigación y Tecnología cárnica para desarrollar nuevos productos, mejorar su calidad y lograr la máxima satisfacción en el proceso productivo.", "Providing our clients with a Global Research and Technology Center for meat to develop new meat products, improve their quality, and achieve maximum satisfaction in the production process."),
          },
          {
            title: L("Desarrollamos sistemas 4.0 totalmente integrados que mejoran la eficiencia operativa e impulsan la innovación gracias a nuestra tecnología propia.", "We specialize in developing fully integrated 4.0 systems that enhance operational efficiency and drive innovation through our proprietary technology."),
            text: L("Ofrecemos Plantas Completas llave en mano, con automatización total y nuestros propios sistemas de conectividad 4.0 MQC_System: la máxima seguridad técnica y alimentaria en productos cocidos, marinados, curados y snacks. Somos dueños de cada tecnología crítica de nuestros equipos, lo que se traduce en actualizaciones más rápidas, un conocimiento más profundo del proceso y una evolución de la línea sin fricciones.", "We offer our clients Complete Plants, turnkey solutions, with total automation and our own 4.0 connectivity systems MQC_System: maximum technical and food safety in cooked, marinated, cured products, and snacks. We own every critical technology in our equipment. That means faster upgrades, deeper process knowledge, and seamless line evolution."),
          },
          {
            title: L("Estamos presentes en todo el mundo y ofrecemos una atención directa y personalizada.", "We are present worldwide and offer direct, personalized care."),
            text: L("Nuestra tecnología y maquinaria están presentes en plantas cárnicas de todo el mundo. Una amplia red de representantes y agentes exclusivos garantiza una comunicación directa y servicio técnico en cada país.", "Our technology and machinery are present in meat processing plants around the world. A wide network of representatives and exclusive agents ensures direct communication and technical service in every country."),
          },
          {
            title: L("Confiamos en la Creativación para dar forma al futuro de la industria cárnica, impulsando la innovación y la sostenibilidad.", "We rely on Creativation to shape the future of the meat industry, driving innovation and sustainability."),
            text: L("Basamos nuestra actividad en una estrategia de diferenciación a través de la Creativación (Creatividad x Innovación), junto con la máxima calidad de nuestros equipos, el Diseño Inteligente, el Talento y la Colaboración Abierta con clientes y socios.", "We base our activity on a differentiation strategy through Creativation (Creativity X Innovation) along with the highest quality of our Teams, Intelligent Design, Talent, and Open Collaboration with our clients and partners."),
          },
        ],
      },
      {
        type: "products_highlight",
        eyebrow: L("¿QUÉ HACEMOS? REDEFINIR LO ESTÁNDAR", "WHAT WE DO? REDEFINING WHAT’S STANDARD"),
        title_muted: L("Diseñado para el proceso.", "Engineered for the process."),
        title: L("Construido para durar.", "Built for the long run."),
        subtitle: L("Diseñamos y fabricamos equipos y tecnología de proceso para la elaboración de productos cárnicos y/o a base de proteínas.", "We design and manufacture equipment and process technology for the production of meat and/or protein-based products."),
        button: null,
        show_filters: true,
        all_label: L("TODOS", "ALL"),
        items: [L("COCIDOS", "COOKED"), L("MARINADOS", "MARINATED"), L("CURADOS", "CURATED"), L("SNACKS", "SNACKS")].flatMap((category) =>
          [
            [I.m1, L("Inyectoras de carne", "Meat Injectors"), L("Inyección precisa de salmuera, pieza a pieza.", "Precise brine injection, piece after piece.")],
            [I.m2, L("Descongelación de carne", "Meat Defrosting"), L("Descongelación controlada que conserva la calidad.", "Controlled defrosting that preserves quality.")],
            [I.m3, L("Embutidoras de carne", "Meat Stuffers"), L("Embutición continua y precisa.", "Continuous, precise stuffing.")],
          ].map(([image, name, description]) => ({ image, name, category, description, link: link("", "@page:machine") })),
        ),
      },
      { type: "gradient_divider", direction: "up" },
      {
        type: "data_highlights",
        eyebrow: "",
        title_muted: "",
        title: L("Estándares altos. Cero concesiones.", "High standards. Zero compromises."),
        subtitle: "",
        button: null,
        items: [
          { value: "50+", description: L("Años inventando aquello con lo que hoy funciona la industria", "Years inventing what the industry runs on today") },
          { value: "90+", description: L("Países donde opera la ingeniería de Metalquimia", "Countries where Metalquimia engineering operates") },
          { value: "+100", description: L("Patentes propias y tecnologías registradas", "Proprietary patents and registered technologies") },
          { value: "15%", description: L("De la inversión destinada a proyectos de investigación y desarrollo.", "Investment allocated for research and development projects.") },
        ],
      },
      {
        type: "media_text",
        theme: "light",
        image_position: "left",
        eyebrow: L("CREATIVACIÓN", "CREATIVATION"),
        title_muted: L("Partnership para toda la vida", "Partnership for life"),
        title: L("que genera inventos", "that produces inventions"),
        text: L("<p>La Creativación es la forma en que Metalquimia entiende la I+D: un proceso en el que el conocimiento profundo del proceso, la ciencia de los alimentos y la ingeniería mecánica se unen para crear soluciones que antes no existían.</p>", "<p>Creativation is Metalquimia's approach to R&D: a process where deep process knowledge, food science, and mechanical engineering converge to create solutions that didn't exist before.</p>"),
        details: "",
        button: link(L("Descubre nuestro modelo", "Discover our model"), "@page:partnership"),
        image: I.partner,
      },
      {
        type: "media_text",
        theme: "light",
        image_position: "right",
        eyebrow: L("SOSTENIBILIDAD", "SUSTAINABILITY"),
        title_muted: "",
        title: L("Comprometidos con la sociedad y con nuestro entorno.", "We are committed to society and our environment."),
        text: L("<p>Nuestro Código Ético, el respeto por el Medio Ambiente y los Objetivos de Desarrollo Sostenible (ODS), así como las actividades de nuestra propia Fundación, son algunos ejemplos del compromiso de nuestra empresa con la construcción de un mundo mejor.</p>", "<p>Our Code of Ethics, our respect for the Environment, and the Sustainable Development Goals (SDGs), as well as the activities of our own Foundation, are some examples of our company's commitment to building a better world.</p>"),
        details: "",
        button: link(L("descubre más", "discover more"), "@page:about"),
        image: I.building,
      },
      { ...banner(), button: link(L("EXPLORA NUESTRAS TECNOLOGÍAS", "EXPLORE OUR TECHNOLOGIES"), "@page:technologies") },
      {
        ...insights(L("Últimas novedades", "Latest Insights")),
        button: link(L("VER TODOS", "VIEW ALL"), "@page:resources"),
        items: [
          [I.insight1, L("Metalquimia estuvo presente en la feria Propak de Filipinas", "Metalquimia attended the Propak trade fair in the Philippines")],
          [I.insight2, L("Sistema automatizado y continuo para coextrusión y cocción rápida de salchichas", "Automated continuous system for sausage co-extrusion and fast cooking")],
          [I.insight3, L("Metalquimia estuvo presente de nuevo en la feria IPPE 2026 | Atlanta (USA)", "Metalquimia once again attended IPPE 2026 | Atlanta (USA)")],
          [I.insight4, L("El socio de ingeniería para la industria cárnica y de proteínas", "The engineering partner for the meat and protein industry")],
        ].map(([image, title]) => ({ image, category: L("NOTICIAS", "NEWS"), date: L("20 DE JULIO DE 2026", "JULY 20, 2026"), title, link: link("", "@page:insight") })),
      },
    ],
  },
  {
    key: "solutions",
    es: { title: "Soluciones", slug: "soluciones" },
    en: { title: "Solutions", slug: "solutions" },
    sections: [
      {
        type: "solutions_grid",
        eyebrow: L("NUESTRAS SOLUCIONES", "OUR SOLUTIONS"),
        title_muted: L("Procesado con precisión y", "Processed with precision and"),
        title: L("control total en cada etapa.", "full control at every stage."),
        subtitle: "",
        button: link(L("SOLICITA INFORMACIÓN", "REQUEST INFO"), "@page:contact#form"),
        items: [
          ["cooked", L("Cocidos", "Cooked"), I.solutionCooked, L("La ingeniería de la precisión detrás de cada loncha.", "Engineering the precision behind every slice.")],
          ["marinated", L("Marinados", "Marinated"), I.solutionMarinated, L("Sabor uniforme, de la primera pieza a la última.", "Uniform flavor, from the first piece to the last.")],
          ["cured", L("Curados", "Cured"), I.solutionCured, L("La tradición, perfeccionada con precisión de ingeniería.", "Tradition perfected through engineering precision.")],
          ["snacks", "Snacks", I.solutionSnacks, L("El bocado perfecto en cada pieza de proteína.", "Defining the perfect bite in every protein piece.")],
          ["sausages", L("Salchichas", "Sausages"), I.solutionSausages, L("Uniformidad impecable en cada porción.", "Flawless uniformity in every portion.")],
          ["petfood", "Pet food", I.solutionPetfood, L("Ingeniería avanzada para la nutrición premium de mascotas.", "Advanced engineering for premium pet nutrition.")],
        ].map(([key, name, image, text]) => ({ image, name, text, link: link("", `@page:${key}`) })),
      },
      {
        ...partnership(),
        text: L("<p>La Creativación es la forma en que Metalquimia entiende la I+D: un proceso en el que el conocimiento profundo del proceso, la ciencia de los alimentos y la ingeniería mecánica se unen para crear soluciones que antes no existían.</p>", "<p>Creativation is Metalquimia's approach to R&D: a process where deep process knowledge, food science, and mechanical engineering converge to create solutions that didn't exist before.</p>"),
        button: link(L("Descubre nuestro modelo", "Discover our model"), "@page:partnership"),
      },
    ],
  },
  division({ key: "cooked", slugEs: "cocidos", slugEn: "cooked", word: "Cooked", nameEs: "Cocidos", products: I.cookedProducts, heroMuted: L("La ingeniería de la precisión", "Engineering the precision"), heroTitle: L("detrás de cada loncha.", "behind every slice."), stepsMuted: L("No vendemos máquinas para cada paso.", "We don't sell machines for each step."), stepsTitle: L("Diseñamos todo el proceso del cocido.", "We engineer the entire cooked process."), uniform: L("Un producto final totalmente uniforme", "Completely uniform final product"), equipMuted: L("Los equipos detrás de los cocidos", "The equipment behind the world's"), equipTitle: L("más constantes del mundo.", "most consistent cooked products."), recipeMuted: L("Partnership para toda la vida", "Partnership for life"), recipeTitle: L("que genera inventos", "that produces inventions"), plates: I.cookedPlates, custom: cooked }),
  division({ key: "marinated", slugEs: "marinados", slugEn: "marinated", word: "Marinated", nameEs: "Marinados", products: I.marinatedProducts, heroMuted: L("Sabor uniforme, de la primera", "Uniform flavor, from the"), heroTitle: L("pieza a la última.", "first piece to the last."), stepsMuted: L("La uniformidad del sabor a escala no es suerte.", "Flavor uniformity at scale isn't luck."), stepsTitle: L("Es un proceso que perfeccionamos.", "It's a process we engineer to perfection."), uniform: L("Un producto final totalmente uniforme", "Completely uniform final product"), equipMuted: L("Los equipos detrás de los marinados", "The equipment behind the world's"), equipTitle: L("más constantes del mundo.", "most consistent marinated products."), recipeMuted: L("Tu receta evoluciona.", "Your recipe evolves."), recipeTitle: L("Tu proceso también debería.", "Your process should too."), plates: I.marinatedPlates, custom: marinated }),
  division({ key: "cured", slugEs: "curados", slugEn: "cured", word: "Cured", nameEs: "Curados", products: [I.hamSlices, ...I.curedProducts.slice(0, 4), I.hamSlices, I.curedProducts[4]], heroMuted: L("QDS Process. La tradición perfeccionada con", "QDS Process. Tradition perfected through"), heroTitle: L("precisión de ingeniería.", "engineering precision."), stepsMuted: L("El curado es un proceso lento. Controlar cada", "Curing is a slow process. Controlling every"), stepsTitle: L("variable es lo que crea la calidad.", "variable in it is where quality is made."), uniform: "", equipMuted: L("Los equipos detrás de los curados", "The equipment behind the world's"), equipTitle: L("más constantes del mundo.", "most consistent cured products."), recipeMuted: L("Partnership para toda la vida", "Partnership for life"), recipeTitle: L("que genera inventos", "that produces inventions"), plates: I.curedPlates, custom: cured }),
  division({ key: "snacks", slugEs: "snacks", slugEn: "snacks", word: "Snacks", nameEs: "Snacks", products: I.snacksProducts, heroMuted: L("Uniformidad impecable", "Flawless uniformity"), heroTitle: L("en cada porción.", "in every portion."), stepsMuted: L("Producir snacks a escala exige un", "Snack production at scale demands a"), stepsTitle: L("proceso en el que cada variable esté controlada.", "process where every variable is controlled."), uniform: L("Ofrecemos soluciones para producir snacks tipo jerky, productos extrusionados y chips crujientes.", "We offer solutions for the production of Jerky-style snacks, extruded products, and crispy chips."), equipMuted: L("Los equipos detrás de los snacks", "The equipment behind the world's"), equipTitle: L("más constantes del mundo.", "most consistent snack products."), recipeMuted: L("La industria avanza rápido.", "The industry moves fast."), recipeTitle: L("Nosotros avanzamos con ella.", "We move with it."), plates: I.snacksPlates, custom: snacks }),
  // Copy provisional: en el Figma casi todo el texto de Salchichas y Pet food está copiado de Snacks (nota "Info Sausages i Pet food per procés i característiques").
  division({ key: "sausages", slugEs: "salchichas", slugEn: "sausages", word: "Sausages", nameEs: "Salchichas", products: I.sausagesProducts, heroMuted: L("Definiendo el bocado perfecto", "Defining the perfect bite"), heroTitle: L("en cada pieza de proteína.", "in every protein piece."), stepsMuted: L("La uniformidad no surge por casualidad.", "Uniformity doesn't just happen."), stepsTitle: L("Exige un proceso perfectamente controlado.", "It requires a perfectly controlled process."), uniform: L("Ofrecemos soluciones para producir snacks tipo jerky, productos extrusionados y chips crujientes.", "We offer solutions for the production of Jerky-style snacks, extruded products, and crispy chips."), equipMuted: L("Los equipos detrás de las salchichas", "The equipment behind the world's"), equipTitle: L("más constantes del mundo.", "most consistent sausage products."), recipeMuted: L("La industria avanza rápido.", "The industry moves fast."), recipeTitle: L("Nosotros avanzamos con ella.", "We move with it."), plates: I.sausagesPlates, custom: sausages }),
  division({ key: "petfood", slugEs: "pet-food", slugEn: "pet-food", word: "Pet food", nameEs: "Pet food", products: I.petfoodProducts, heroMuted: L("Ingeniería avanzada", "Advanced engineering"), heroTitle: L("para la nutrición premium de mascotas.", "for premium pet nutrition."), stepsMuted: L("Producir nutrición para mascotas a escala no es fácil.", "Pet nutrition at scale isn't easy."), stepsTitle: L("Es un proceso que perfeccionamos con ingeniería.", "It's a process we engineer to perfection."), uniform: L("Ofrecemos soluciones para producir snacks tipo jerky, productos extrusionados y chips crujientes.", "We offer solutions for the production of Jerky-style snacks, extruded products, and crispy chips."), equipMuted: L("Los equipos detrás de los productos", "The equipment behind the world's"), equipTitle: L("para mascotas más constantes del mundo.", "most consistent pet food products."), recipeMuted: L("La industria avanza rápido.", "The industry moves fast."), recipeTitle: L("Nosotros avanzamos con ella.", "We move with it."), plates: I.petfoodPlates, custom: petfood }),
  {
    key: "meat-injection",
    es: { title: "Inyección de carne", slug: "inyeccion-de-carne" },
    en: { title: "Meat injection", slug: "meat-injection" },
    sections: [
      // Figma Páginas › 443:16228. El hero se queda fijo mientras el scroll ilumina el texto de la derecha.
      {
        type: "hero_secondary",
        title: L("Inyección de carne", "Meat injection"),
        subtitle_muted: L("Ventajas significativas en la", "Significant advantages in"),
        subtitle: L("inyección por spray de la carne", "spray-injection of meat"),
        subtitle_end: L("con los equipos y la tecnología de Metalquimia.", "using Metalquimia's equipment and technology."),
        scroll_highlight: true,
        lines: true,
        button: link(L("SOLICITA INFORMACIÓN", "REQUEST INFO"), "@page:contact#form"),
        image: "",
        image_fit: "contain",
      },
      { type: "gradient_divider", direction: "down" },
      ...[
        [
          "Movistick",
          L("Distribución uniforme de la salmuera y máxima precisión de inyección gracias al efecto spray.", "Uniform distribution of brine and maximum injection precision through the spray effect."),
          [
            [I.movistickClassic, "Movistick Classic", L("Distribución uniforme de la salmuera y máxima precisión en la inyección de carne.", "Uniform distribution of brine and maximum precision in meat injection.")],
            [I.movistickTriplex, "Movistick triplex", L("La MOVISTICK TRIPLEX es una inyectora hidráulica autopropulsada que puede equiparse con hasta 3 cabezales de inyección.", "The MOVISTICK TRIPLEX is a self-propelled hydraulic injection machine that can be equipped with up to 3 injection heads.")],
          ],
        ],
        [
          "Moviplus 4.0",
          // Texto tal cual del Figma (repite el de la Movistick Triplex).
          L("La MOVISTICK TRIPLEX es una inyectora hidráulica autopropulsada que puede equiparse con hasta 3 cabezales de inyección.", "The MOVISTICK TRIPLEX is a self-propelled hydraulic injection machine that can be equipped with up to 3 injection heads."),
          [
            [I.moviplusSignature, "Moviplus 4.0 Signature Edition", L("Injection Molding, the Next: excelencia en diseño inteligente.", "Injection Molding, the Next: Excellence in Smart Design.")],
            [I.moviplus40, "Moviplus 4.0", L("La nueva Moviplus 4.0 se ha diseñado especialmente para la ciberindustria del futuro.", "The new Moviplus version 4.0 has been specially designed for the cyber-industry of the future.")],
            [I.moviplusE, "Moviplus-E", L("Nueva línea de inyectoras de carne con accionamiento totalmente eléctrico.", "New line of meat injectors with a fully electric drive system.")],
          ],
        ],
        [
          "Movimax Zero",
          L("La inyectora de carne con menor huella de carbono del mercado.", "The meat injector with the lowest carbon footprint on the market."),
          [[I.movimaxZero, "Movimax Zero", L("La inyectora de carne neutra en carbono.", "The Carbon-Neutral Meat Injector.")]],
        ],
      ].map(([name, subtitle, items]) => ({
        ...machines(L("Inyectoras de carne", "Meat Injectors"), name),
        eyebrow: "",
        muted_last: true,
        show_filters: false,
        subtitle,
        items: items.map(([image, itemName, description]) => ({ image, name: itemName, category: L("INYECCIÓN", "INJECTION"), description, link: link("", `@page:${machineKey[itemName.toLowerCase()]}`) })),
      })),
      { type: "gradient_divider", direction: "up" },
      {
        ...partnership(),
        text: L(
          "<p>La Creativación es el enfoque de Metalquimia para la I+D: un proceso en el que el conocimiento profundo del proceso, la ciencia de los alimentos y la ingeniería mecánica convergen para crear soluciones que antes no existían.</p>",
          "<p>Creativation is Metalquimia's approach to R&amp;D: a process where deep process knowledge, food science, and mechanical engineering converge to create solutions that didn't exist before.</p>",
        ),
        button: link(L("DESCUBRE NUESTRO MODELO", "DISCOVER OUR MODEL"), "@page:partnership"),
      },
    ],
  },
  ...machinePages,
  {
    key: "industry",
    es: { title: "Pet care", slug: "industria-pet-care" },
    en: { title: "Pet care", slug: "pet-care-industry" },
    sections: [
      { type: "hero_secondary", title: "Pet care", subtitle_muted: L("Tecnología de inyección y cocción", "Injection and cooking technology"), subtitle: L("para snacks premium para mascotas.", "for premium pet treats."), button: link(L("SABER MÁS", "LEARN MORE"), "@page:contact#form"), image: I.machineLine, image_fit: "contain" },
      logos(),
      { type: "media_text", theme: "light", image_position: "right", eyebrow: "PET CARE", title_muted: L("La precisión de inyección y cocción", "The injection and cooking precision"), title: L("que exigen los snacks premium.", "that premium pet treats demand."), text: L("<p>Las mismas tecnologías que usan los grandes fabricantes cárnicos, adaptadas a los formatos y exigencias del pet food.</p>", "<p>The same technologies used by the big meat processors, adapted to the formats and demands of pet food.</p>"), details: "", button: link(L("SOLICITA INFORMACIÓN", "REQUEST INFO"), "@page:contact#form"), image: I.tunnel },
      { type: "media_text", theme: "light", image_position: "left", eyebrow: L("FORMATOS", "FORMATS"), title_muted: L("Geometría exacta para chews, dental sticks", "Exact geometry for chews, dental sticks,"), title: L("y snacks de alto valor.", "and high-value snack formats."), text: L("<p>Control dimensional y de textura para que cada unidad sea idéntica.</p>", "<p>Dimensional and texture control so every unit is identical.</p>"), details: "", button: null, image: I.partner },
      machines(L("Los equipos detrás de los productos", "The equipment behind the world's"), L("más constantes del mundo.", "most consistent cooked products.")),
      { type: "highlights_carousel", theme: "dark", eyebrow: L("POR QUÉ METALQUIMIA", "WHY METALQUIMIA"), title_muted: L("Por qué los fabricantes de pet care eligen Metalquimia", "Why pet care producers choose Metalquimia"), title: L("frente a equipos genéricos.", "over purpose-built pet food equipment."), subtitle: "", button: null, items: [I.machineHero, I.software, I.silo].map((image, i) => ({ image, lead: [L("Más rendimiento.", "Higher yield."), L("Control total.", "Full control."), L("Higiene.", "Hygiene.")][i], text: L("Tecnología probada en la industria cárnica.", "Technology proven in the meat industry."), link: null })) },
      { type: "media_text", theme: "light", image_position: "left", eyebrow: L("INNOVACIÓN", "INNOVATION"), title_muted: L("La industria avanza rápido.", "The industry moves fast."), title: L("Nosotros avanzamos con ella.", "We move with it."), text: L("<p>Desarrollamos contigo nuevos formatos en nuestra planta piloto.</p>", "<p>We develop new formats with you in our pilot plant.</p>"), details: "", button: link(L("CONÓCENOS", "LEARN MORE"), "@page:innovation"), image: I.partner },
      banner(),
      insights(),
    ],
  },
  {
    key: "engineering",
    es: { title: "Engineering Mindset", slug: "engineering-mindset" },
    en: { title: "Engineering Mindset", slug: "engineering-mindset" },
    sections: [
      { type: "hero", image: I.engineeringHero, image_mobile: "", title_muted: L("Donde la industria se detiene,", "Where the industry stops,"), title: L("Metalquimia diseña.", "Metalquimia engineers."), button: link(L("CONTÁCTANOS", "CONTACT US"), "@page:contact"), button_style: "solid" },
      { type: "gradient_divider", direction: "up" },
      { type: "media_text", theme: "light", image_position: "right", eyebrow: "ENGINEERING MINDSET", title_muted: "", title: L("Metalquimia ofrece una solución integral para el diseño de plantas de producción llave en mano versátiles, automatizadas, higiénicas, seguras y respetuosas con el medio ambiente.", "Metalquimia offers a comprehensive solution for the design of turnkey production plants that are versatile, automated, hygienic, safe, and environmentally friendly."), title_size: "m", text: "", details: "", button: link(L("SOLICITA INFORMACIÓN", "REQUEST INFORMATION"), "@page:contact#form"), image: I.engineeringTurnkey },
      { type: "gradient_divider", direction: "down" },
      {
        type: "highlights_carousel",
        theme: "dark",
        eyebrow: "",
        title_muted: L("Lo que nos hace diferentes", "What makes us different"),
        title: "",
        subtitle: "",
        button: null,
        items: [
          {
            image: I.diffGlobal,
            tone: "light",
            lead: L("Enfoque global.", "Global approach."),
            text: L(
              "La presencia constante de nuestros tecnólogos e ingenieros en los mercados cárnicos de todo el mundo nos permite identificar sus necesidades reales. También nos aporta una gran cantidad de información y nos permite anticiparnos a las nuevas tendencias del sector. Esto nos inspira para desarrollar nuevos productos con el máximo valor añadido.",
              "The constant presence of our technologists and engineers in global meat markets allows us to identify the real needs of the global meat market. It also provides us with a wealth of information and enables us to anticipate new trends in the industry. This inspires us to develop new products with maximum added value.",
            ),
            link: null,
          },
          {
            image: I.diffTailored,
            tone: "light",
            lead: L("Adaptado a las necesidades reales del cliente.", "Tailored to the client's actual needs."),
            text: L(
              "Tras analizar los requisitos de cada planta, nuestros equipos de Tecnología e Ingeniería te presentan el diseño de la línea de producción de cocidos, marinados, curados o snacks que mejor se ajusta a tus objetivos.",
              "Once we have analyzed the unique requirements of each plant, our Technology and Engineering teams will present you with the production line design for cooked, marinated, or cured meat products or snacks that perfectly matches your goals.",
            ),
            link: null,
          },
          {
            image: I.diffLines,
            tone: "dark",
            lead: L("Sinergia de línea completa.", "Unified line synergy."),
            text: L(
              "No solo fabricamos máquinas independientes: diseñamos líneas de procesado completas y en circuito cerrado. Al controlar cada etapa de la cadena mecánica, nuestros equipos trabajan juntos de forma nativa para maximizar el rendimiento de proteína y eliminar los cuellos de botella de integración.",
              "We don't just manufacture standalone machines; we engineer complete, closed-loop processing lines. By controlling every stage of the mechanical chain, our equipment interacts natively to maximize overall protein yield and eliminate integration bottlenecks.",
            ),
            link: null,
          },
        ],
      },
      { ...banner(), button: link(L("EXPLORA NUESTRAS TECNOLOGÍAS", "EXPLORE OUR TECHNOLOGIES"), "@page:technologies") },
      insights(L("Últimos recursos", "Latest Resources")),
    ],
  },
  {
    key: "technologies",
    es: { title: "Tecnologías propias", slug: "tecnologias-propias" },
    en: { title: "Proprietary technologies", slug: "proprietary-technologies" },
    sections: [
      // Figma Páginas › Tecnologías propias (307:11299).
      { type: "hero", image: I.techHero, image_mobile: "", title_muted: "", title: L("Ofrecemos una amplia gama de servicios de consultoría y tecnología.", "We offer a wide range of consulting and technology services."), button: link(L("CONTACTA", "CONTACT US"), "@page:contact#form"), button_style: "solid", overlay: "veil" },
      ...[
        [L("Consultoría tecnológica", "Technology Consulting"), L("La división tecnológica de Metalquimia es uno de los pilares más prestigiosos y reconocidos de la empresa, y ayuda a mejorar de forma continua la competitividad sostenible de la industria cárnica a escala mundial.", "Metalquimia's technology division is one of the company's most prestigious and well-recognized pillars, and it helps to continuously improve the sustainable competitiveness of the meat industry on a global scale."), I.techConsulting],
        [L("Plantas piloto", "Pilot plants"), L("Metalquimia cuenta con plantas piloto de última generación para investigar y desarrollar nuevos métodos de procesado y productos cárnicos, que se actualizan constantemente con las últimas tecnologías.", "Metalquimia has state-of-the-art pilot facilities for the research and development of new meat processing methods and products, which are constantly being upgraded with the latest technologies."), I.techPilot],
        [L("Diseño de plantas llave en mano", "Turnkey Plant Design"), L("Metalquimia ofrece una solución integral y una garantía total para la elaboración de productos cárnicos, con líneas de producción versátiles, automatizadas, higiénicas, seguras y respetuosas con el medio ambiente.", "Metalquimia offers a comprehensive solution and a full guarantee for the production of meat products, with versatile, automated, hygienic, safe, and environmentally friendly production lines."), I.techTurnkey],
        [L("Laboratorios de ensayo", "Testing Laboratories"), L("Metalquimia ofrece a sus clientes un servicio de análisis personalizado y especializado (químico y microbiológico) para la optimización y el control continuos de productos cárnicos y aditivos alimentarios.", "Metalquimia offers its customers a personalized and specialized analysis service (chemical and microbiological) for the ongoing optimization and control of meat products and food additives."), I.techLabs],
        [L("Formulación de aditivos", "Additive Formulation"), L("El Departamento de Tecnología ofrece a sus clientes un servicio de formulación y optimización de salmueras y adobos, una herramienta esencial para mejorar continuamente la competitividad de los productos cárnicos.", "The Technology Department offers its clients a service for the formulation and optimization of brines and marinades, an essential tool for continuously improving the competitiveness of meat products."), I.techAdditives],
        [L("Servicio bibliográfico", "Bibliographic Service"), L("Metalquimia pone a disposición de sus clientes una amplia base de conocimiento científico, con artículos y documentación sobre tecnología de productos cárnicos.", "Metalquimia provides its customers with an extensive database of scientific knowledge, including articles and documentation on meat product technology."), I.techBibliography],
      ].map(([title, text, image], i) => ({ type: "media_text", theme: "light", image_position: i % 2 ? "left" : "right", eyebrow: "", title_muted: "", title, text: L(`<p>${text.es}</p>`, `<p>${text.en}</p>`), details: "", button: link(L("SOLICITA INFORMACIÓN", "REQUEST INFORMATION"), "@page:contact#form"), image })),
      { type: "full_screen_media", image: I.waves, video: "", video_url: "https://www.youtube.com/watch?v=aqz-KE-bpKQ", button_label: L("VER VÍDEO", "WATCH VIDEO") },
      logos(),
    ],
  },
  {
    key: "innovation",
    es: { title: "MQ Innovation Center", slug: "mq-innovation-center" },
    en: { title: "MQ Innovation Center", slug: "mq-innovation-center" },
    sections: [
      // Figma Páginas › MQ Innovation Center 307:12454 (textos del Figma, que repiten los de la Moviplus 4.0).
      {
        type: "hero",
        image: I.partner,
        image_mobile: "",
        title_muted: L("Procesado con precisión y", "Processed with precision and"),
        title: L("control total en cada etapa.", "full control at every stage."),
        button: link(L("CONTACTA", "CONTACT US"), "@page:contact#form"),
        button_style: "solid",
        overlay: "soft",
      },
      { type: "text_banner", eyebrow: "", title_muted: L("Decisiones de ingeniería que hacen", "Engineering decisions that make"), title: L("diferente a la MOVIPLUS 4.0.", "the MOVIPLUS 4.0 different.") },
      { type: "gradient_divider", direction: "up" },
      { type: "two_column_media", theme: "light", items: [{ image: I.innovationDrum, caption: "" }, { image: I.innovationHeads, caption: "" }] },
      ...[
        ["right", L("Nació porque los inyectores estándar", "Built because standard"), L("no estaban a nuestra altura.", "injectors couldn't meet our standards."), I.innovationNeedles],
        ["left", L("Partnership para toda la vida", "Partnership for life"), L("que genera inventos", "that produces inventions"), I.partner],
      ].map(([image_position, title_muted, title, image]) => ({
        type: "media_text",
        theme: "light",
        image_position,
        eyebrow: L("LA SOLUCIÓN", "THE SOLUTION"),
        title_muted,
        title,
        text: L(
          "<p>Diseñada para el procesado de piezas enteras cocidas a gran escala, la MOVIPLUS 4.0 combina la inyección autorregulada con conectividad 4.0 completa y ofrece la precisión en el reparto de la salmuera que exige un producto premium, a escala industrial.</p>",
          "<p>Designed for high-output cooked whole muscle processing, the MOVIPLUS 4.0 combines self-regulating injection technology with full 4.0 connectivity — delivering the brine distribution precision that premium product quality demands, at industrial scale.</p>",
        ),
        details: "",
        button: link(L("SOLICITA INFORMACIÓN", "REQUEST INFORMATION"), "@page:contact#form"),
        image,
      })),
      { type: "gradient_divider", direction: "down" },
      moviplusDifferent(),
      { type: "gradient_divider", direction: "up" },
      logos(),
      insights(),
    ],
  },
  {
    key: "proteins",
    es: { title: "Proteínas alternativas", slug: "proteinas-alternativas" },
    en: { title: "Plant-based proteins", slug: "plant-based-proteins" },
    sections: [
      { type: "hero", image: I.yellowRing, image_mobile: "", title: L("Investigación en proteínas\nde origen vegetal.", "Plant-based\nprotein research."), button: link(L("SABER MÁS", "LEARN MORE"), "@page:contact#form") },
      { type: "media_text", theme: "light", image_position: "right", eyebrow: L("NUEVAS PROTEÍNAS", "NEW PROTEINS"), title_muted: L("Nació porque los inyectores estándar", "Built because standard injectors"), title: L("no estaban a nuestra altura.", "couldn't meet our standards."), text: L("<p>Aplicamos 50 años de experiencia cárnica a las proteínas alternativas.</p>", "<p>We apply 50 years of meat experience to alternative proteins.</p>"), details: "", button: null, image: I.touch },
      { type: "full_screen_media", image: I.waves, video: "", video_url: "", button_label: "" },
      { type: "feature_highlights", eyebrow: L("MÉTODO", "METHOD"), title_muted: L("El método de ingeniería", "The engineering method"), title: L("que genera inventos", "that produces inventions"), subtitle: "", button: null, image: I.machineHero, items: [{ icon: "", lead: L("Investigación aplicada.", "Applied research."), text: L("Ensayos con producto real.", "Trials with real product.") }, { icon: "", lead: L("Escalado.", "Scale-up."), text: L("Del laboratorio a la planta.", "From lab to plant.") }, { icon: "", lead: L("Acompañamiento.", "Support."), text: L("A tu lado en cada paso.", "By your side at every step.") }] },
      { type: "bullet_points", eyebrow: "MOVIPLUS 4.0", title_muted: L("Decisiones de ingeniería que hacen", "Engineering decisions that make"), title: L("diferente a la MOVIPLUS 4.0.", "the MOVIPLUS 4.0 different."), subtitle: "", highlight_title: L("¿Hablamos de tu proyecto?", "Shall we talk about your project?"), highlight_text: L("Un experto te contactará.", "An expert will contact you."), highlight_button: link(L("SOLICITA INFORMACIÓN", "REQUEST INFORMATION"), "@page:contact#form"), items: [L("Precisión", "Precision"), L("Higiene", "Hygiene"), L("Conectividad", "Connectivity"), L("Eficiencia", "Efficiency"), L("Servicio", "Service")].map((title) => ({ icon: "", title, text: L("Diseñado para el proceso, construido para durar.", "Engineered for the process, built for the long run.") })) },
      banner(),
    ],
  },
  {
    key: "partnership",
    es: { title: "Partnership", slug: "partnership" },
    en: { title: "Partnership", slug: "partnership" },
    sections: [
      // Figma Páginas › Industry (307:14786).
      { type: "hero_secondary", title: "Partnership", subtitle_muted: L("Procesado con precisión y", "Processed with precision and"), subtitle: L("control total en cada etapa.", "full control at every stage."), lines: true, button: link(L("SABER MÁS", "LEARN MORE"), "@page:contact#form"), image: I.partnershipHero, image_fit: "full" },
      logos(),
      {
        type: "media_text",
        theme: "light",
        image_position: "right",
        eyebrow: L("LA SOLUCIÓN", "THE SOLUTION"),
        title_muted: L("La creamos porque las inyectoras estándar", "Built because standard"),
        title: L("no estaban a nuestra altura.", "injectors couldn't meet our standards."),
        text: L(
          "<p>Diseñada para el procesado de piezas enteras cocidas a gran escala, la MOVIPLUS 4.0 combina la inyección autorregulada con conectividad 4.0 completa: la precisión en el reparto de la salmuera que exige un producto premium, a escala industrial.</p>",
          "<p>Designed for high-output cooked whole muscle processing, the MOVIPLUS 4.0 combines self-regulating injection technology with full 4.0 connectivity — delivering the brine distribution precision that premium product quality demands, at industrial scale.</p>",
        ),
        details: "",
        button: link(L("SOLICITA INFORMACIÓN", "REQUEST INFORMATION"), "@page:contact#form"),
        image: I.partnershipSolution,
      },
      {
        type: "steps_carousel",
        theme: "light",
        eyebrow: L("INGENIERÍA DE PROCESO DE PRINCIPIO A FIN", "END-TO-END PROCESS ENGINEERING"),
        title_muted: L("No vendemos máquinas para cada paso.", "We don't sell machines for each step."),
        title: L("Diseñamos todo el proceso del cocido.", "We engineer the entire cooked process."),
        subtitle: "",
        button: null,
        items: [
          [I.partnershipSteps[0], L("Preparación de la salmuera.", "Brine preparation."), L("Formulación precisa para la inyección, con control total sobre la base de cada producto cocido constante.", "Precision formulation for injection, giving you full control over the foundation of every consistent cooked product.")],
          [I.methodCard2, L("Inyección multiaguja.", "Multi-needle injection."), L("Reparto uniforme de la salmuera en toda la pieza, sea cual sea su tamaño o forma, pensado para eliminar en origen la variabilidad del rendimiento.", "Uniform brine distribution throughout the whole muscle, regardless of piece size or shape, engineered to eliminate yield variability at the source.")],
          [I.partnershipSteps[1], L("Masaje.", "Tumbling and massaging."), L("Acción mecánica controlada que asegura la extracción de proteína, la fijación de la salmuera y el desarrollo de la textura, con tambores refrigerados.", "Controlled mechanical action that ensures protein extraction, brine binding, and texture development with refrigerated drum technology.")],
          [I.partnershipSteps[2], L("Tratamiento térmico.", "Thermal processing."), L("Ciclos de cocción, ahumado y enfriamiento pensados para una temperatura uniforme en el corazón y la mejor textura, configurables para cada producto.", "Cooking, smoking, and chilling cycles designed for uniform core temperature and optimal texture retention — configurable for each product specification.")],
          [I.partnershipSteps[3], L("Control conectado del proceso.", "Connected process control."), L("MQConnect reúne los datos de cada etapa en un solo panel para una trazabilidad total y la mejora continua del proceso.", "MQConnect integrates data from every stage into a single dashboard for full traceability and continuous process improvement.")],
        ].map(([image, lead, text]) => ({ image, lead, text })),
      },
      { type: "gradient_divider", direction: "down" },
      {
        type: "testimonial",
        title_muted: "",
        title: L("Nuestros clientes no tienen\nmargen de error", "Our customers have\nno margin for error"),
        label: L("CON LA CONFIANZA DE LOS LÍDERES DEL SECTOR", "TRUSTED BY INDUSTRY LEADERS"),
        items: [I.logoE, I.logoC, I.logoE, I.logoC].map((logo, i) => ({
          logo,
          name: ["Plumrose", "Sigma", "Plumrose", "Sigma"][i],
          quote: L(
            "Llevábamos quince años con líneas de piezas enteras cocidas cuando decidimos trabajar con Metalquimia. Lo que no esperábamos era el conocimiento del proceso que aportaron sus ingenieros: no solo del equipo, sino de nuestro producto, nuestra formulación de salmuera y nuestros objetivos de rendimiento. No nos vendieron una máquina. Vinieron con nosotros al Innovation Center, hicieron pruebas con nuestra materia prima real y volvieron con una especificación de proceso que nunca habíamos conseguido.",
            "We had been running cooked whole muscle lines for fifteen years when we decided to partner with Metalquimia. What we didn't expect was the level of process knowledge their engineers brought to the table — not just about the equipment, but about our specific product, our brine formulation, our yield targets. They didn't sell us a machine. They came to the Innovation Center with us, ran trials with our actual raw material, and came back with a process specification that we'd never been able to achieve before.",
          ),
          author: "John Doe",
          role: L("Director de operaciones de procesado", "Head of Processing Operations"),
        })),
      },
      engineeringMethod(),
      { type: "gradient_divider", direction: "up" },
      caseStudies(),
    ],
  },
  {
    key: "about",
    es: { title: "Sobre Metalquimia", slug: "sobre-metalquimia" },
    en: { title: "About Metalquimia", slug: "about-metalquimia" },
    sections: [
      // Figma Páginas › About us 752:20648.
      { type: "hero_secondary", layout: "stacked", title_lead: L("Nuestro propósito:", "Our purpose:"), title: L("Inspirar cómo el mundo procesa la carne, diseñando las soluciones que dan forma a un futuro más seguro y sostenible.", "We're in business to inspire how the world processes meat by engineering the solutions that shape a safer, more sustainable future."), subtitle_muted: "", subtitle: "", button: link(L("SABER MÁS", "LEARN MORE"), "@page:partnership"), image: I.aboutHq, image_fit: "full" },
      { type: "media_text", theme: "light", image_position: "right", eyebrow: L("QUIÉNES SOMOS", "WHO WE ARE"), title_muted: "", title: L("El socio de ingeniería para la industria cárnica y de proteínas.", "The engineering partner for the meat and protein industry."), title_size: "m", text: L("<p>Fundada en 1971 en Girona (Cataluña), Metalquimia es una empresa familiar líder mundial en tecnología para el procesado de alimentos.</p><p>Creamos soluciones pioneras que transforman la manera en que el mundo produce alimentos. De la inyección al curado, diseñamos y fabricamos líneas de producción llave en mano y equipos industriales para productos cárnicos cocidos, marinados y curados, y snacks.</p>", "<p>Founded in 1971 in Girona, Catalonia, Metalquimia is a family-owned global leader in food processing technology.</p><p>We create pioneering solutions that transform the way the world produces food. From injection to curing, we design and manufacture complete turnkey production lines and industrial equipment for cooked, marinated, and cured meat products and snacks.</p>"), details: "", button: link(L("SOLICITA INFORMACIÓN", "REQUEST INFORMATION"), "@page:contact#form"), image: I.aboutTeam },
      { type: "timeline", eyebrow: "", title_muted: L("Nuestra historia", "Our history"), title: "", subtitle: "", button: null, items: history },
      { type: "steps_carousel", theme: "light", eyebrow: "", title_muted: L("Lo que nos hace diferentes", "What makes us different"), title: "", subtitle: "", button: null, items: [
        { image: I.aboutValues[0], lead: L("Creativación.", "Creativation."), text: L("El éxito de Metalquimia se basa en una estrategia de creativación (creatividad + innovación), diferenciación y mejora de la calidad de sus productos: una estrategia compartida y abierta a todos los empleados y colaboradores de la empresa.", "Metalquimia's success is based on a strategy of creativation (creativity + innovation), differentiation, and improving the quality of its products—a strategy that is shared and open to all company employees and partners.") },
        { image: I.aboutValues[1], lead: L("Cultura de valor.", "Culture of value."), text: L("La clave de Metalquimia está en su propia identidad: que todos sus miembros compartan el mismo espíritu inquieto e innovador, del que nace una cultura de valor, eficacia, eficiencia, calidad y servicio.", "The key factor behind Metalquimia lies in its very identity: ensuring that all its members share the same restless and innovative spirit, which gives rise to a culture of value, effectiveness, efficiency, quality, and service.") },
        { image: I.aboutValues[2], lead: L("Ética y transparencia.", "Ethics and transparency."), text: L("Para fomentar un entorno de transparencia y promover el cumplimiento de la ley y de las normas de conducta del Código Ético, Grupo Metalquimia dispone de un sistema interno de información y de su correspondiente canal de comunicación.", "With the aim of fostering an environment of transparency and promoting compliance with the law and the standards of conduct set forth in the Code of Ethics, Grupo Metalquimia has an internal reporting system and its corresponding communication channel.") },
        { image: I.aboutValues[3], lead: "Fundació Metalquimia.", text: L("La Fundació Metalquimia quiere contribuir a transformar la sociedad y mejorar la vida de las personas conectando creatividad e innovación para construir un futuro mejor, con pequeñas acciones capaces de generar un cambio significativo.", "The Metalquimia Foundation seeks to help transform society and improve people's lives by connecting creativity and innovation to build a better future, driving small actions capable of generating meaningful change.") },
      ] },
      { type: "people_grid", eyebrow: L("LIDERAZGO", "LEADERSHIP"), title_muted: L("Presidencia", "Presidency"), title: "", subtitle: "", button: null, items: [[I.aboutPeople[0], "Narcís Lagares Corominas", L("Presidente de honor", "Honorary President")], [I.aboutPeople[1], "Josep Lagares Gamero", L("Presidente ejecutivo / CEO", "Executive President / CEO")], [I.aboutPeople[2], "Narcís Lagares Gamero", L("Miembro del Consejo de Administración", "Member of the Board of Directors")], [I.aboutPeople[3], "Llorenç Freixanet Garriga", L("Director general", "Chief Executive Officer")]].map(([photo, name, role]) => ({ photo, name, role, link: link("LinkedIn", "https://www.linkedin.com/company/metalquimia/", "_blank") })) },
      {
        type: "insights_carousel",
        title: L("Reconocimientos", "Acknowledgments"),
        button: link(L("VER TODOS", "VIEW ALL"), "@page:resources"),
        items: [
          { image: I.aboutAwards[0], category: L("RECONOCIMIENTOS", "AWARDS"), date: L("MAYO 2023", "MAY 2023"), title: L("Metalquimia, premiada en la 3.ª edición de los Premios Josep Pallach", "Metalquimia Wins an Award at the 3rd Annual Josep Pallach Awards"), link: link("", "@page:insight") },
          { image: I.aboutAwards[1], category: L("RECONOCIMIENTOS", "AWARDS"), date: L("ABRIL 2021", "APRIL 2021"), title: L("Metalquimia recibe el iF DESIGN AWARD 2021 por su línea Signature", "Metalquimia Receives the 2021 iF DESIGN AWARD for Its Signature Line"), link: link("", "@page:insight") },
          { image: I.aboutAwards[2], category: L("RECONOCIMIENTOS", "AWARDS"), date: L("NOVIEMBRE 2020", "NOVEMBER 2020"), title: L("Premio Delta de Oro, categoría Digital, para Metalquimia", "Delta d'OR Award - Digital Category for Metalquimia"), link: link("", "@page:insight") },
        ],
      },
    ],
  },
  {
    key: "facilities",
    es: { title: "Instalaciones", slug: "instalaciones" },
    en: { title: "Facilities", slug: "facilities" },
    sections: [
      { type: "hero_secondary", title: L("Instalaciones", "Facilities"), subtitle_muted: L("Encuentra todos nuestros edificios e instalaciones", "Find all our buildings and installations"), subtitle: "", lines: true, button: link(L("CONTACTO", "CONTACT"), "@page:contact"), image: I.facilitiesHero, image_fit: "full" },
      // Figma Instalaciones 325:20597…355:16806: dirección, teléfono y email en el cuerpo; el botón abre Google Maps.
      ...facilities().map((f, i) => ({
        type: "media_text",
        theme: "light",
        image_position: i % 2 ? "left" : "right",
        eyebrow: f.eyebrow,
        title_muted: "",
        title: f.title,
        text: { __l: true, es: `<p>${f.street}<br>${f.phone.es}<br>info@metalquimia.com</p>`, en: `<p>${f.street}<br>${f.phone.en}<br>info@metalquimia.com</p>` },
        details: "",
        button: link(L("VER EN EL MAPA", "SEE ON THE MAP"), `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(f.query)}`, "_blank"),
        image: f.image,
      })),
      { type: "two_column_media", theme: "light", items: [{ image: I.pilot, caption: "" }, { image: I.training, caption: "" }] },
      offices(),
    ],
  },
  {
    key: "services",
    es: { title: "Servicios", slug: "servicios" },
    en: { title: "Services", slug: "services" },
    sections: [
      { type: "hero_secondary", title: L("Servicios", "Services"), subtitle_muted: L("Procesado con precisión y", "Processed with precision and"), subtitle: L("control total en cada etapa.", "full control at every stage."), lines: true, button: link(L("SABER MÁS", "LEARN MORE"), "@page:contact#form"), image: I.servicesHero, image_fit: "full" },
      { type: "text_banner", eyebrow: "", title_muted: L("Decisiones de ingeniería que hacen", "Engineering decisions that make"), title: L("diferente a la MOVIPLUS 4.0.", "the MOVIPLUS 4.0 different.") },
      { type: "gradient_divider", direction: "up" },
      ...[
        [
          L("TECNOLÓGICOS", "TECHNOLOGICAL"),
          L("Servicios de consultoría", "Consulting services"),
          L("para maximizar la calidad del producto.", "to maximize product quality."),
          L("Servicios especializados de consultoría y tecnología centrados en optimizar los métodos de procesado de la carne y mejorar la calidad del producto final. Trabajar de cerca con expertos garantiza soluciones a medida que mejoran los rendimientos y la satisfacción del cliente.", "Specialized consulting and technological services focus on optimizing meat processing methods and improving final product quality. Working closely with experts ensures tailored solutions that enhance processing yields and deliver maximum customer satisfaction."),
          "@page:contact#form",
          I.servicesConsulting,
        ],
        [
          L("RECAMBIOS Y SERVICIO", "PARTS & SERVICE"),
          L("Asistencia técnica", "Technical assistance"),
          L("y servicio de recambios.", "and spare parts service."),
          L("El departamento de Recambios y Servicio ofrece una asistencia técnica eficiente, de calidad y personalizada. Combina recambios fiables con soporte técnico para dar respuesta a cualquier necesidad de la maquinaria.", "The Parts & Service Department ensures efficient, high-quality, and personalized technical assistance. This service combines reliable spare parts with technical support to address every machinery requirement."),
          "@page:service-detail",
          I.servicesParts,
        ],
        [
          L("FORMACIÓN", "TRAINING"),
          L("Formación especializada", "Specialized training"),
          L("para crear conocimiento técnico.", "to build technical know-how."),
          L("Ingenieros y tecnólogos especializados imparten formaciones a medida para los profesionales de tu planta. Esta transferencia directa de conocimiento da a tu equipo el dominio técnico del manejo de la maquinaria, la constancia del proceso y la seguridad operativa.", "Specialized engineers and technologists conduct training sessions tailored for your plant's professionals. This direct transfer of knowledge ensures your team acquires technical expertise regarding machinery handling, process consistency, and operational safety."),
          "@page:contact#form",
          I.servicesTraining,
        ],
        [
          L("INGENIERÍA", "ENGINEERING"),
          L("Soluciones integrales", "Integral solutions"),
          L("para plantas de producción.", "for production plants."),
          L("Nuestros servicios de ingeniería acompañan todo el diseño de plantas de producción versátiles, automatizadas y llave en mano. Cada proyecto integra normas higiénicas, seguridad operativa y tecnologías respetuosas con el medio ambiente para lograr una instalación totalmente optimizada.", "Comprehensive engineering services provide full support in the design of versatile, automated, and turnkey production plants. Every project integrates hygienic standards, operational safety, and environmentally friendly technologies to deliver a completely optimized processing facility."),
          "@page:contact#form",
          I.servicesTurnkey,
        ],
        [
          L("MODERNIZACIÓN", "UPGRADE"),
          L("Renovación de equipos", "Equipment renovation"),
          L("y modernización.", "and modernization."),
          L("El Plan Renove actualiza la maquinaria existente con las últimas innovaciones tecnológicas. Estas intervenciones especializadas restauran componentes, mejoran la eficiencia del procesado y añaden funciones avanzadas para alargar al máximo la vida de las líneas de producción.", "The Renovation Plan updates existing machinery by integrating the latest technological innovations. These specialized interventions restore components, enhance processing efficiency, and add advanced features to maximize the lifespan of production lines."),
          "@page:contact#form",
          I.servicesUpgrade,
        ],
      ].map(([eyebrow, muted, title, text, url, image], i) => ({ type: "media_text", theme: "light", image_position: i % 2 ? "left" : "right", eyebrow, title_muted: muted, title, title_stacked: true, text: { __l: true, es: `<p>${text.es}</p>`, en: `<p>${text.en}</p>` }, details: "", button: link(L("SABER MÁS", "LEARN MORE"), url), image })),
      { type: "gradient_divider", direction: "down" },
      moviplusDifferent(),
      engineeringMethod(),
      { type: "gradient_divider", direction: "up" },
      logos(),
      caseStudies(),
    ],
  },
  {
    key: "service-detail",
    parent: "services",
    es: { title: "Asistencia técnica", slug: "asistencia-tecnica" },
    en: { title: "Technical assistance", slug: "technical-assistance" },
    sections: [
      { type: "hero_secondary", title: L("Asistencia técnica", "Technical assistance"), subtitle_muted: L("Recambios originales y servicio técnico", "Original spare parts and technical service"), subtitle: L("durante toda la vida de tu planta.", "for the whole life of your plant."), button: link(L("PEDIR RECAMBIOS", "ORDER SPARE PARTS"), "@page:contact#form"), image: I.machineLine, image_fit: "contain" },
      { type: "data_highlights", eyebrow: L("SERVICIO", "SERVICE"), title_muted: L("Estándares altos.", "High standards."), title: L("Cero concesiones.", "Zero compromises."), subtitle: "", button: null, items: [{ value: "50+", description: L("Años de experiencia", "Years of experience") }, { value: "90+", description: L("Técnicos en todo el mundo", "Technicians worldwide") }, { value: "+100", description: L("Países", "Countries") }, { value: "4", description: L("Centros técnicos", "Technical centers") }] },
      { type: "media_text", theme: "light", image_position: "right", eyebrow: L("RECAMBIOS", "SPARE PARTS"), title_muted: L("Recambios originales", "Original spare parts"), title: L("en el menor tiempo.", "in the shortest time."), text: L("<p>Stock permanente y envíos a todo el mundo.</p>", "<p>Permanent stock and worldwide shipping.</p>"), details: "", button: link(L("PEDIR RECAMBIOS", "ORDER SPARE PARTS"), "@page:contact#form"), image: I.touch },
      { type: "cards_info", columns: "3", eyebrow: L("CÓMO TE AYUDAMOS", "HOW WE HELP"), title_muted: L("Soporte en", "Support at"), title: L("cada etapa.", "every stage."), subtitle: "", button: link(L("CONTACTAR", "CONTACT"), "@page:contact#form"), items: [[L("Mantenimiento preventivo", "Preventive maintenance"), I.engineer], [L("Diagnóstico remoto", "Remote diagnostics"), I.software], [L("Formación de operarios", "Operator training"), I.training]].map(([title, image]) => ({ image, title, text: L("Un equipo técnico especializado a tu servicio.", "A specialised technical team at your service."), link: null })) },
      caseStudies(),
    ],
  },
  {
    key: "representatives",
    es: { title: "Red de representantes", slug: "red-de-representantes" },
    en: { title: "Representatives", slug: "representatives" },
    sections: [
      // Figma Páginas › Representatives (307:15479): título con las líneas detrás, texto y mapa con filtros por continente y país.
      { type: "hero_secondary", title: L("Representantes", "Representatives"), subtitle_muted: "", subtitle: "", lines: true, button: null, image: "", image_fit: "contain" },
      {
        type: "interactive_map",
        eyebrow: "",
        title_muted: "",
        title: "",
        subtitle: L(
          "La red comercial y de servicio de Metalquimia llega a todo el mundo. Usa el mapa para encontrar tu representante más cercano o contacta directamente con la sede central de Metalquimia en Girona (España).",
          "Metalquimia's sales and service network spans the globe. Use the map to find your nearest representative, or contact Metalquimia's headquarters directly in Girona, Spain.",
        ),
        focus: "world",
        show_list: false,
        search_placeholder: "",
        show_filters: true,
        continent_label: L("Ver representantes por continente", "View representatives by continent"),
        country_label: L("Ver representante por país", "View representative by country"),
        all_label: L("Ver todos", "View All"),
        map_link_label: L("Ver en el mapa", "View on the map"),
        locations: [
          // El primero es el del Figma; el resto, de relleno hasta tener la lista real.
          {
            name: "RUAMPAT CO., LTD.",
            subtitle: "Mr. Chuchvee Ike Paoboon",
            continent: L("Asia", "Asia"),
            country: L("Tailandia", "Thailand"),
            lat: "13.7246",
            lng: "100.5155",
            address: L("152/11 Silom Rd. Suriyawong\nBKK 10500 Bangrak, BKK 10500 (Tailandia)", "152/11 Silom Rd. Suriyawong\nBKK 10500 Bangrak, BKK 10500 (Thailand)"),
            phone: "+662 635 77 55",
            fax: "+662 635 71 17",
            email: "ike@ruampat.com",
            website: "http://www.ruampat.com/",
            image: I.repRuampat,
            hours: "",
          },
          ...[
            [L("Francia", "France"), L("Europa", "Europe"), "Lyon", 45.76, 4.84],
            [L("Alemania", "Germany"), L("Europa", "Europe"), "Frankfurt", 50.11, 8.68],
            [L("Italia", "Italy"), L("Europa", "Europe"), "Milano", 45.46, 9.19],
            [L("Portugal", "Portugal"), L("Europa", "Europe"), "Lisboa", 38.72, -9.14],
            [L("Reino Unido", "United Kingdom"), L("Europa", "Europe"), "Manchester", 53.48, -2.24],
            [L("Irlanda", "Ireland"), L("Europa", "Europe"), "Dublin", 53.35, -6.26],
            [L("Países Bajos", "Netherlands"), L("Europa", "Europe"), "Utrecht", 52.09, 5.12],
            [L("Dinamarca", "Denmark"), L("Europa", "Europe"), "Aarhus", 56.16, 10.2],
            [L("Suecia", "Sweden"), L("Europa", "Europe"), "Göteborg", 57.71, 11.97],
            [L("Polonia", "Poland"), L("Europa", "Europe"), "Warszawa", 52.23, 21.01],
            [L("Hungría", "Hungary"), L("Europa", "Europe"), "Budapest", 47.5, 19.04],
            [L("Grecia", "Greece"), L("Europa", "Europe"), "Athína", 37.98, 23.73],
            [L("Marruecos", "Morocco"), L("África", "Africa"), "Casablanca", 33.57, -7.59],
            [L("Madagascar", "Madagascar"), L("África", "Africa"), "Antananarivo", -18.88, 47.51],
            [L("Emiratos Árabes Unidos", "United Arab Emirates"), L("Asia", "Asia"), "Dubai", 25.2, 55.27],
            [L("India", "India"), L("Asia", "Asia"), "New Delhi", 28.61, 77.21],
            [L("México", "Mexico"), L("América", "America"), "Ciudad de México", 19.43, -99.13],
            [L("Brasil", "Brazil"), L("América", "America"), "São Paulo", -23.55, -46.63],
            [L("Australia", "Australia"), L("Oceanía", "Oceania"), "Sydney", -33.87, 151.21],
          ].map(([country, continent, city, lat, lng]) => ({
            name: L(`Representante en ${country.es}`, `Representative in ${country.en}`),
            subtitle: "",
            continent,
            country,
            lat: String(lat),
            lng: String(lng),
            address: city,
            phone: "+34 972 214 658",
            fax: "",
            email: "info@metalquimia.com",
            website: "",
            image: "",
            hours: "",
          })),
        ],
      },
      { type: "gradient_divider", direction: "down" },
      { type: "testimonial", title_muted: L("Nuestros clientes no tienen", "Our customers have"), title: L("margen de error", "no margin for error"), label: L("CON LA CONFIANZA DE LOS LÍDERES DEL SECTOR", "TRUSTED BY INDUSTRY LEADERS"), items: [I.logoA, I.logoB, I.logoC].map((logo, i) => ({ logo, name: `Cliente ${i + 1}`, quote: L("Un socio, no un proveedor.", "A partner, not a supplier."), author: ["Joan Puig", "Marta Vidal", "Pere Soler"][i], role: L("Director de planta", "Plant Manager") })) },
    ],
  },
  {
    key: "resources",
    es: { title: "Recursos", slug: "recursos" },
    en: { title: "Resources", slug: "resources" },
    sections: [
      {
        type: "insights_grid",
        title: L("Últimas novedades", "Latest Insights"),
        all_label: L("TODOS", "ALL"),
        load_more_label: L("CARGAR MÁS", "LOAD MORE"),
        items: Array.from({ length: 12 }, (_, i) => ({
          image: [I.insight1, I.insight2, I.insight3, I.insight4][i % 4],
          category: [L("COCIDOS", "COOKED"), L("MARINADOS", "MARINATED"), L("CURADOS", "CURED"), L("SNACKS", "SNACKS")][i % 4],
          date: `${String(28 - i * 2).padStart(2, "0")}.0${(i % 9) + 1}.2026`,
          title: [L("Cómo Metrilus redujo un 40 % las paradas", "How Metrilus cut downtime by 40%"), L("Nueva generación de inyectoras", "A new generation of injectors"), L("Por qué el futuro de la industria cárnica se basa en datos", "Why the future of the meat industry is data-driven"), L("El socio de ingeniería para la industria cárnica", "The engineering partner for the meat industry")][i % 4],
          link: link("", i % 4 === 0 ? "@page:case-metrilus" : "@page:insight"),
        })),
      },
    ],
  },
  {
    key: "insight",
    parent: "resources",
    es: { title: "Por qué el futuro de la industria cárnica se basa en datos", slug: "futuro-industria-carnica-datos" },
    en: { title: "Why the Future of the Meat Industry Is Data-Driven", slug: "future-meat-industry-data-driven" },
    sections: [
      {
        type: "article",
        category: L("ARTÍCULO", "ARTICLE"),
        reading_time: L("10 MIN DE LECTURA", "10 MIN READ"),
        date: L("18 de enero de 2026", "18 January 2026"),
        title: L("Por qué el futuro de la industria cárnica se basa en datos", "Why the Future of the Meat Industry Is Data-Driven"),
        intro: L("Medir cada etapa del proceso permite producir más, con menos merma y una calidad constante.", "Measuring every stage of the process makes it possible to produce more, with less waste and consistent quality."),
        author: "Metalquimia",
        author_label: L("Escrito por", "Written by"),
        date_label: L("Publicado el", "Published on"),
        image: I.caseHero,
        blocks: articleBlocks([I.caseRing, I.caseMachines]),
      },
      caseStudies(),
    ],
  },
  casePage("case-metrilus", "Metrilus", "Cómo Metrilus redujo un 40 % las paradas con Metalquimia", "How Metrilus cut downtime by 40% with Metalquimia", "caso-metrilus", "case-metrilus", I.caseHero),
  casePage("case-tarradellas", "Casa Tarradellas", "Cómo Casa Tarradellas redujo un 40 % las paradas con QDS Pro", "How Casa Tarradellas cut downtime by 40% with QDS Pro", "caso-casa-tarradellas", "case-casa-tarradellas", I.caseHero),
  casePage("case-elpozo", "ElPozo", "Cómo ElPozo redujo un 40 % las paradas con QDS", "How ElPozo cut downtime by 40% with QDS", "caso-elpozo", "case-elpozo", I.caseHero),
  {
    key: "careers",
    es: { title: "Empleo", slug: "empleo" },
    en: { title: "Careers", slug: "careers" },
    sections: [
      { type: "page_title", eyebrow: "", title: L("Empleo", "Careers"), subtitle: "" },
      { type: "media_text", theme: "light", image_position: "right", eyebrow: "", title_muted: "", title: L("Trabaja con nosotros", "Work with us"), text: L("<p>Buscamos personas curiosas que quieran dar forma al futuro de la tecnología para el procesado de carne. Ingeniería, producción, ventas y servicio técnico en un entorno internacional.</p>", "<p>We are looking for curious people who want to shape the future of meat processing technology. Engineering, production, sales and technical service in an international environment.</p>"), details: "", button: link(L("ENVÍA TU CV", "SEND YOUR CV"), "mailto:rrhh@metalquimia.com"), image: I.meeting },
      { type: "link_list", align: "center", eyebrow: L("OFERTAS", "JOB OFFERS"), title_muted: L("Construye algo con nosotros.", "Build something with us."), title: L("Forma parte del equipo.", "Be part of our team."), subtitle: "", items: [[L("Experto operacional", "Operational Expert"), "Girona"], [L("Ingeniero agrónomo", "Agricultural Engineer"), "Girona"], [L("Analista de marketing", "Marketing Analyst"), "Girona"], [L("Ingeniero de ventas", "Sales Engineer"), L("Remoto", "Remote")], [L("Ingeniero de procesos", "Process Engineer"), "Girona"]].map(([name, role]) => ({ avatar: "", name, role, link: link("", "mailto:rrhh@metalquimia.com") })) },
    ],
  },
  {
    key: "contact",
    es: { title: "Contacto", slug: "contacto" },
    en: { title: "Contact", slug: "contact" },
    sections: [
      { type: "contact_cards", eyebrow: L("CONTACTO", "CONTACT"), title_muted: L("Nuestra prioridad es ofrecer", "Our priority is to offer"), title: L("una atención personalizada a todos nuestros clientes", "personalized attention to all of our clients"), highlight_title: L("Envía una consulta", "Send an inquiry"), highlight_text: L("Integración completa con MQConnect para la monitorización en tiempo real, el registro de parámetros y el diagnóstico remoto.", "Full integration with MQConnect for real-time injection monitoring, parameter logging, and remote diagnostics."), highlight_button: link(L("IR AL FORMULARIO", "GO TO FORM"), "#form"), items: [{ icon: "phone", label: L("Teléfono", "Phone number"), value: "+34 972 214 658", link: null }, { icon: "email", label: "Email", value: "info@metalquimia.com", link: null }] },
      {
        type: "contact_form",
        anchor: "form",
        title: L("Envía una consulta", "Send an inquiry"),
        label_name: L("Nombre y apellidos", "Name and surname"),
        label_company: L("Empresa", "Company name"),
        label_address: L("Dirección", "Address"),
        label_home_address: L("Dirección de facturación", "Home address"),
        label_postal_code: L("Código postal", "Postal code"),
        label_country: L("País", "Country"),
        label_phone: L("Teléfono", "Phone number"),
        label_email: "Email",
        label_message: L("Mensaje", "Message"),
        ph_name: "John Doe",
        ph_company: L("Nombre de la empresa", "Company name"),
        ph_address: L("Calle Ejemplo 14", "Street Name 14"),
        ph_home_address: L("Calle Ejemplo 14", "Street Name 14"),
        ph_postal_code: "08011",
        ph_country: L("Selecciona…", "Select..."),
        ph_phone: "(+34) 675 645 345",
        ph_email: "johndoe@mail.com",
        ph_message: L("Tengo una consulta…", "I have an inquiry..."),
        countries: L("España\nFrancia\nAlemania\nItalia\nPortugal\nReino Unido\nEstados Unidos\nMéxico\nBrasil\nChina\nOtro", "Spain\nFrance\nGermany\nItaly\nPortugal\nUnited Kingdom\nUnited States\nMexico\nBrazil\nChina\nOther"),
        terms_label: L('Acepto los <a href="#">términos y condiciones</a>*', 'I accept the <a href="#">terms and conditions</a>*'),
        marketing_label: L("Acepto recibir información sobre las actividades, servicios y productos de Metalquimia", "I accept to receive information about Metalquimia's activities, services and products"),
        legal_text: L("<p>Información básica sobre protección de datos (Reglamento UE 2016/679 y LO 3/2018). Responsable: Metalquimia, SAU. Finalidad: atender tu consulta y enviarte información si lo aceptas. Derechos: acceso, rectificación, supresión y los demás que se detallan en la política de privacidad.</p>", "<p>Basic data protection information (EU Regulation 2016/679 and LO 3/2018). Controller: Metalquimia, SAU. Purpose: to answer your inquiry and send you information if you accept. Rights: access, rectification, erasure and the others detailed in the privacy policy.</p>"),
        submit_label: L("ENVIAR", "SEND"),
        error_required: L("Este campo es obligatorio", "This field is required"),
        success_message: L("Gracias. Te responderemos lo antes posible.", "Thank you. We will get back to you as soon as possible."),
        error_message: L("No se ha podido enviar. Inténtalo de nuevo.", "It could not be sent. Please try again."),
      },
      offices(),
    ],
  },
];

/** Los cinco edificios de Metalquimia (Figma Instalaciones 307:20167), para los Combo Text+Media y el mapa "Our offices". */
function facilities() {
  const phone = { es: "Tel.: +34 972 214 658", en: "Phone: +34 972 214 658" };
  return [
    {
      eyebrow: L("Sede social", "Registered office"),
      title: L("Sede social y dirección de facturación", "Headquarters and Billing Address"),
      street: "Sant Ponç de la Barca, s/n 17007 Girona",
      phone: { es: `${phone.es} - NIF ESA-17018276`, en: `${phone.en} - NIF/VAT Nr. ESA-17018276` },
      office: L("Sede social / Facturación", "Registered office / Billing"),
      officeSubtitle: L("Sede social central y dirección para facturación", "Central registered office and billing address"),
      address: "Sant Ponç de la Barca, s/n\n17007 Girona",
      query: "Metalquimia, Sant Ponç de la Barca, 17007 Girona",
      lat: 41.9905,
      lng: 2.8105,
      image: I.hqHouse,
    },
    {
      eyebrow: L("Centro tecnología de la carne", "Meat technology center"),
      title: L("Centro de Investigación y Tecnología de la Carne", "Meat Research and Technology Center"),
      street: "Font de l'Abat, 21 17007 Girona",
      phone,
      office: L("Centro tecnología de la carne", "Meat technology center"),
      officeSubtitle: L("Centro de Investigación y Tecnología de la carne", "Meat Research and Technology Center"),
      address: "Font de l'Abat, 21\n17007 Girona",
      query: "Font de l'Abat 21, 17007 Girona",
      lat: 41.9858,
      lng: 2.8063,
      image: I.meatCenter,
    },
    {
      eyebrow: L("Talleres de montaje", "Assembly workshops"),
      title: L("Taller de montaje de maquinaria", "Machinery Assembly Workshop"),
      street: "Polígon Indústria Jardí - C/ Olivera, 2 17843 Palol de Revardit (Girona)",
      phone,
      office: L("Talleres de montaje", "Assembly workshops"),
      officeSubtitle: L("Taller de montaje de maquinaria", "Machinery assembly workshop"),
      address: "Polígon Indústria Jardí - C/ Olivera, 2\n17843 Palol de Revardit (Girona)",
      query: "Carrer Olivera 2, 17843 Palol de Revardit",
      lat: 42.0613,
      lng: 2.7947,
      image: I.workshop,
    },
    {
      eyebrow: L("Talleres transformación chapa", "Sheet metal workshops"),
      title: L("Instalaciones productivas", "Production Facilities"),
      street: "Pol. Indústria Jardí - C/ Ginebrer, 3-5 17843 Palol de Revardit (Girona)",
      phone,
      office: L("Talleres transformación chapa", "Sheet metal workshops"),
      officeSubtitle: L("Instalaciones productivas", "Production facilities"),
      address: "Pol. Indústria Jardí - C/ Ginebrer, 3-5\n17843 Palol de Revardit (Girona)",
      query: "Carrer Ginebrer 3, 17843 Palol de Revardit",
      lat: 42.0628,
      lng: 2.7965,
      image: I.production,
    },
    {
      eyebrow: L("Taller de montaje de grandes plantas", "Large plant assembly workshop"),
      title: L("Nuevo taller de montaje de maquinaria", "New Machinery Assembly Workshop"),
      street: "Pol. Indústria Jardí - C/ Ginebrer, 2 17843 Palol de Revardit (Girona)",
      phone,
      office: L("Taller de montaje de grandes plantas", "Large plant assembly workshop"),
      officeSubtitle: L("Nuevo taller de montaje de maquinaria", "New machinery assembly workshop"),
      address: "Pol. Indústria Jardí - C/ Ginebrer, 2\n17843 Palol de Revardit (Girona)",
      query: "Carrer Ginebrer 2, 17843 Palol de Revardit",
      lat: 42.0635,
      lng: 2.7978,
      image: I.newWorkshop,
    },
  ];
}

function offices() {
  return {
    type: "interactive_map",
    eyebrow: L("ENCUÉNTRANOS EN", "FIND US IN"),
    title_muted: "",
    title: L("Nuestras oficinas", "Our offices"),
    subtitle: "",
    focus: "europe",
    show_list: true,
    search_placeholder: L("Buscar (ciudad, código postal, municipio…)", "Search (City, postal code, municipality, etc)"),
    locations: facilities().map((f) => ({
      name: f.office,
      subtitle: f.officeSubtitle,
      lat: String(f.lat),
      lng: String(f.lng),
      address: f.address,
      phone: "+34 972 214 658",
      email: "info@metalquimia.com",
      image: f.image,
      hours: L("Lunes a viernes\n08:30 – 13:00 | 15:00 – 18:00", "Monday to Friday\n08:30 – 13:00 | 15:00 – 18:00"),
    })),
  };
}

// ---------- Ajustes globales ----------
export const options = {
  logo: "",
  logo_dark: "",
  header_cta: link(L("CONTACTO", "CONTACT"), "@page:contact"),
  prefooter_title_muted: L("Donde la industria se detiene,", "Where the industry stops,"),
  prefooter_title: L("Metalquimia diseña.", "Metalquimia engineers."),
  prefooter_button: link(L("HABLA CON UN EXPERTO", "TALK TO AN EXPERT"), "@page:contact#form"),
  footer_claim: L("El socio foodtech y de ingeniería para la industria cárnica y de proteínas", "The foodtech & engineering partner for the meat and protein industry"),
  newsletter_label: L("SUSCRÍBETE A LA NEWSLETTER", "JOIN OUR NEWSLETTER"),
  newsletter_placeholder: "johndoe@mail.com",
  newsletter_terms: L('Acepto los <a href="#">términos y condiciones</a>*', 'I accept the <a href="#">terms and conditions</a>*'),
  newsletter_success: L("¡Gracias por suscribirte!", "Thanks for subscribing!"),
  contact_title: L("CONTACTO", "CONTACT US"),
  phone: "+34 972 214 658",
  email: "info@metalquimia.com",
  socials: [
    { network: "linkedin", url: "https://www.linkedin.com/company/metalquimia/" },
    { network: "x", url: "https://x.com/metalquimia" },
    { network: "instagram", url: "https://www.instagram.com/metalquimia/" },
    { network: "youtube", url: "https://www.youtube.com/@metalquimia" },
  ],
  footer_text: "© Copyright 2026",
  contact_email: "",
  loader_enabled: true,
  loader_text_muted: "Meat.",
  loader_text: "The next.",
  strings: {
    discover_all: L("Ver todas las soluciones", "Discover all solutions"),
    menu: L("Menú", "Menu"),
    nav_label: L("Menú principal", "Main menu"),
    newsletter_submit: L("Suscribirme", "Subscribe"),
    newsletter_error: L("No se ha podido enviar. Inténtalo de nuevo.", "It could not be sent. Please try again."),
    prev: L("Anterior", "Previous"),
    next: L("Siguiente", "Next"),
    carousel: L("Carrusel", "Carousel"),
    close: L("Cerrar", "Close"),
    close_video: L("Cerrar vídeo", "Close video"),
    not_found_title: L("Página no encontrada", "Page not found"),
    not_found_text: L("La página que buscas no existe o ha cambiado de dirección.", "The page you are looking for does not exist or has moved."),
    not_found_button: L("Volver al inicio", "Back to home"),
  },
};

// ---------- Menús ----------
const m = (label, url = "#", extra = {}) => ({ label, url, ...extra });
export const menus = {
  top: [m("Metalquimia Foundation", "https://www.fundaciometalquimia.org/"), m(L("Centro de recursos", "Resources center"), "@page:resources"), m(L("Centro de ayuda", "Help center"), "@page:contact")],
  primary: [
    // Figma "Menús" (305:5989): Productos = tarjetas por tipo de producto, Soluciones = procesos con icono. Cada panel
    // se configura en el elemento de primer nivel (diseño, antetítulo, título y enlace al pie). Los procesos sin página
    // propia enlazan a la página más cercana (producto o inyección).
    m(L("Productos", "Products"), "@page:solutions", {
      layout: "cards",
      eyebrow: L("Nuestros productos", "Our products"),
      title_muted: L("Procesado con precisión y", "Processed with precision and"),
      title: L("control total en cada etapa.", "full control at every stage."),
      link: link(L("Descubre todos los productos", "Discover all products"), "@page:solutions"),
      children: [
        m(L("Cocidos", "Cooked"), "@page:cooked", { image: I.menuCooked }),
        m(L("Marinados", "Marinated"), "@page:marinated", { image: I.solutionMarinated }),
        m(L("Curados", "Cured"), "@page:cured", { image: I.solutionCured }),
        m("Snacks", "@page:snacks", { image: I.solutionSnacks }),
        m(L("Salchichas", "Sausages"), "@page:sausages", { image: I.solutionSausages }),
        m("Pet food", "@page:petfood", { image: I.solutionPetfood }),
      ],
    }),
    m(L("Soluciones", "Solutions"), "@page:meat-injection", {
      layout: "icons",
      eyebrow: L("Nuestras soluciones", "Our solutions"),
      link: link(L("Descubre todas las soluciones", "Discover all solutions"), "@page:solutions"),
      children: [
        [L("Descongelación de carne", "Meat Thawing"), L("Masaje muy suave: producto descongelado de la máxima calidad", "Very gentle massage: thawed product of the highest quality"), "thawing", "@page:cooked"],
        [L("Preparación de salmueras", "Preparation of Brines"), L("Preparación rápida, controlada y eficiente de cualquier tipo de salmuera y adobo", "Quick, controlled, and efficient preparation of any type of brine and marinade"), "brine", "@page:meat-injection"],
        [L("Inyección de carne", "Meat Injection"), L("Reparto espectacular de la salmuera y uniformidad de color", "Spectacular distribution of brine and uniformity of color"), "injection", "@page:meat-injection"],
        [L("Marinado de carne", "Meat Marinating"), L("Marinado de carne con o sin hueso por efecto spray", "Meat marinating with or without bone by spray effect"), "marinating", "@page:marinated"],
        [L("Tenderización de carne", "Meat Tenderization"), L("Más rendimiento y menos mermas de cocción", "Improvement of yield and reduction of cooking losses"), "tenderization", "@page:meat-injection"],
        [L("Masaje de carne", "Meat Massage"), L("Reactores automáticos de vacío con camisa de refrigeración, totalmente versátiles", "Automatic vacuum reactors with cooling jacket, fully versatile"), "massage", "@page:cooked"],
        [L("Embutición de carne", "Meat Stuffing"), L("Embutidoras continuas al vacío para músculo entero", "Continuous vacuum stuffers for whole muscle"), "stuffing", "@page:cooked"],
        [L("Cocción de carne", "Meat Cooking"), L("Cocción inteligente con seguimiento y registro de todos los parámetros técnicos del proceso", "Smart cooking with tracking and recording of all technical parameters of the process"), "cooking", "@page:cooked"],
        [L("Plantas automáticas de cocción y marinado", "Automatic cooking and marinating plants"), L("Conectividad inteligente: el jamón hecho a tu medida", "Smart connectivity: The ham made to your specifications"), "cooking-plants", "@page:cooked"],
        [L("QDSolutions · Loncheados y snacks cárnicos", "QDSolutions - Sliced meats and meat snacks"), L("Maximiza el rendimiento del producto y la flexibilidad operativa", "Maximizes product yield and operational flexibility"), "sliced", "@page:snacks"],
        [L("Salchichas cocidas", "Cooked Sausages"), L("Producción de salchichas con un sabor y una textura inmejorables", "Sausage production with unbeatable flavor and texture"), "sausages", "@page:sausages"],
        ["Pet food", L("Equipos hechos para condiciones exigentes", "Equipment built for tough conditions"), "petfood", "@page:petfood"],
      ].map(([label, description, icon, url]) => m(label, url, { description, icon: I.menuIcons[icon] })),
    }),
    m(L("Nuestro método", "Our method"), "#", {
      layout: "featured",
      eyebrow: L("Nuestro método", "Our method"),
      children: [
        m("Engineering Mindset / Creativació", "@page:engineering", { image: I.methodCard1 }),
        m(L("Tecnologías propias", "Proprietary technologies"), "@page:technologies", { image: I.methodCard2 }),
        m("Creativation Retreats", "@page:engineering"),
        m("Metalquimia Innovation Center", "@page:innovation"),
        m(L("Investigación en proteína vegetal", "Plant-based protein research"), "@page:proteins"),
        m("Partnership", "@page:partnership"),
      ],
    }),
    m(L("Representantes", "Representatives"), "@page:representatives"),
    m(L("Servicio", "Service"), "@page:services", {
      layout: "links",
      eyebrow: L("Nuestros servicios", "Our services"),
      children: [
        m(L("Tecnológico", "Technological"), "@page:innovation"),
        m(L("Recambios y servicio", "Parts & Service"), "@page:service-detail"),
        m(L("Formación", "Training"), "@page:services"),
        m(L("Ingeniería", "Engineering"), "@page:engineering"),
        m(L("Modernización", "Upgrade"), "@page:services"),
        m(L("Pedir recambios", "Order Spare Parts"), "@page:contact#form", { highlight: true }),
      ],
    }),
    m(L("Empresa", "Company"), "@page:about", {
      layout: "links",
      eyebrow: L("Sobre nosotros", "About us"),
      children: [
        m(L("Sobre Metalquimia", "About Metalquimia"), "@page:about"),
        m(L("Historia", "History"), "@page:about"),
        m(L("Liderazgo", "Leadership"), "@page:about"),
        m(L("Noticias y publicaciones", "News and Publications"), "@page:resources"),
        m(L("Revista", "Magazine"), "@page:resources"),
        m(L("Instalaciones", "Facilities"), "@page:facilities"),
        m(L("La Fundación", "The Foundation"), "https://www.fundaciometalquimia.org/"),
        m(L("Calidad", "Quality"), "@page:about"),
        m(L("Código ético", "Code of Ethics"), "@page:about"),
        m(L("Sostenibilidad", "Sustainability"), "@page:about"),
        m(L("Empleo", "Employment"), "@page:careers"),
      ],
    }),
  ],
  footer: [
    m(L("SOLUCIONES", "SOLUTIONS"), "#", { children: [m(L("Cocidos", "Cooked"), "@page:cooked"), m(L("Marinados", "Marinated"), "@page:marinated"), m(L("Curados", "Cured"), "@page:cured"), m("Snacks", "@page:snacks"), m(L("Salchichas", "Sausages"), "@page:sausages"), m("Pet food", "@page:petfood")] }),
    m(L("EMPRESA", "COMPANY"), "#", { children: [m(L("Sobre Metalquimia", "About Metalquimia"), "@page:about"), m(L("Instalaciones", "Facilities"), "@page:facilities"), m(L("Noticias y publicaciones", "News and publications"), "@page:resources"), m(L("La Fundación", "The Foundation"), "https://www.fundaciometalquimia.org/"), m(L("Servicios", "Services"), "@page:services"), m(L("Empleo", "Careers"), "@page:careers")] }),
  ],
  legal: [m(L("Política de cookies", "Cookie Policy"), "#"), m(L("Política de privacidad", "Privacy Policy"), "#"), m(L("Aviso legal", "Legal Notice"), "#")],
};
