export const data = [
  {
    id: 1,
    userName: "sejdijaha123",
    userFullName: "Sejdi Jaha",
    profilePhoto: "https://randomuser.me/api/portraits/men/83.jpg",
    description:
      "Politika në Shqipëri është në një fazë të rëndësishme të zhvillimit. Sfidat janë të mëdha, por shpresat janë të larta. Një nga sfidat kryesore është lufta kundër korrupsionit dhe reforma në drejtësi. Këto janë procese të rëndësishme për të siguruar sundimin e ligjit dhe pavarësinë e institucioneve. Gjithashtu, ekonomia është një temë e rëndësishme. Shqipëria ka shënuar rritje ekonomike, por përkundër kësaj, shumë qytetarë vazhdojnë të kenë probleme me papunësinë dhe varfërinë. Është e rëndësishme të investohet në sektorët e zhvillimit ekonomik për të krijuar vende pune dhe të përmirësuar standardet e jetesës. Në politikën e jashtme, Shqipëria po përpjeket të rrisë bashkëpunimin me partnerët ndërkombëtarë dhe të përshpejtojë procesin e anëtarësimit në Bashkimin Evropian. Ky është një objektiv i rëndësishëm për të ardhmen e vendit.",
    images: [],
    createdAt: new Date("10/07/20203"),
    privacy: "public",
    likes: [
      {
        id: 1,
        userName: "ramizi123",
        profilePhoto: "https://randomuser.me/api/portraits/men/73.jpg",
        userFullName: "Ramiz Konushevci",
      },
    ],
    comments: [
      {
        id: 1,
        userName: "ramizi123",
        userFullName: "Ramiz Konushevci",
        profilePhoto: "https://randomuser.me/api/portraits/men/73.jpg",
        description: "Mir e ki, po so bash qashtu.",
      },
    ],
    shares: 0,
    isFeeling: "happy 😊",
  },
  // 10 more posts with random content
  {
    id: 2,
    userName: "albpetro",
    userFullName: "Alban Petrovani",
    profilePhoto: "https://randomuser.me/api/portraits/men/86.jpg",
    description:
      "Pamjet natyrore të Shqipërisë janë të mahnitshme. Sot u bë një ditë e mrekullueshme për një shëtitje në malin e Tomorrit. #Natyrë #Shqipëri",
    images: ["mountain.jpg"],
    createdAt: new Date("10/08/2023"),
    privacy: "public",
    likes: [],
    comments: [],
    shares: 5,
    isFeeling: "",
  },
  {
    id: 3,
    userName: "lulzim1",
    userFullName: "Lulzim Qose",
    profilePhoto: "https://randomuser.me/api/portraits/men/80.jpg",
    description:
      "Futboll është pasioni im! Sot fituam një ndeshje të rëndësishme me ekipin tonë të preferuar. #Futboll #Fitore",
    images: ["football.jpg"],
    createdAt: new Date("10/09/2023"),
    privacy: "public",
    likes: [
      {
        id: 1,
        userName: "ramizi123",
        profilePhoto: "https://randomuser.me/api/portraits/men/73.jpg",

        userFullName: "Ramiz Konushevci",
      },
      {
        id: 2,
        userName: "maria84",
        profilePhoto: "https://randomuser.me/api/portraits/women/81.jpg",
        userFullName: "Maria Krasniqi",
      },
    ],
    comments: [],
    shares: 10,
    isFeeling: "excited 😄",
  },
  {
    id: 4,
    userName: "sunnydays",
    userFullName: "Linda Bregu",
    profilePhoto: "https://randomuser.me/api/portraits/women/76.jpg",

    description:
      "Plazhet e Shqipërisë janë të mrekullueshme. Dita e sotme është një ditë e përsosur për të shijuar bregdetin. #Plazh #Bregdeti",
    images: ["beach.jpg"],
    createdAt: new Date("10/10/2023"),
    privacy: "public",
    likes: [
      {
        id: 1,
        userName: "ramizi123",
        userFullName: "Ramiz Konushevci",
        profilePhoto: "https://randomuser.me/api/portraits/women/73.jpg",
      },
      {
        id: 3,
        userName: "joni123",
        userFullName: "Joni Avdullahu",
        profilePhoto: "https://randomuser.me/api/portraits/men/56.jpg",
      },
    ],
    comments: [
      {
        id: 1,
        userName: "ramizi123",
        userFullName: "Ramiz Konushevci",
        profilePhoto: "https://randomuser.me/api/portraits/men/73.jpg",
        description: "Dita e përsosur për një dëgjim të bregdetit!",
      },
    ],
    shares: 15,
    isFeeling: "",
  },
  {
    id: 5,
    userName: "naturelover",
    userFullName: "Aida Dibra",
    profilePhoto: "https://randomuser.me/api/portraits/women/72.jpg",

    description:
      "Natyrë e pasur, Shqipëria është vendi ideal për udhëtime në natyrë. Sot u eksploruam një pyll të bukur. #Natyrë #Eksploremi",
    images: ["forest.jpg"],
    createdAt: new Date("10/11/2023"),
    privacy: "public",
    likes: [
      {
        id: 2,
        userName: "maria84",
        userFullName: "Maria Krasniqi",
        profilePhoto: "https://randomuser.me/api/portraits/women/74.jpg",
      },
      {
        id: 3,
        userName: "joni123",
        userFullName: "Joni Avdullahu",
        profilePhoto: "https://randomuser.me/api/portraits/men/56.jpg",
      },
    ],
    comments: [],
    shares: 8,
    isFeeling: "happy 😊",
  },
  {
    id: 6,
    userName: "adventurespirit",
    userFullName: "Artan Gjokaj",
    profilePhoto: "https://randomuser.me/api/portraits/men/62.jpg",

    description:
      "Adrenalina është gjithçka! Sot u bë një aventurë emocionuese me rafting në lumin Vjosë. #Adventurë #Rafting",
    images: ["rafting.jpg"],
    createdAt: new Date("10/12/2023"),
    privacy: "public",
    likes: [
      {
        id: 1,
        userName: "ramizi123",
        userFullName: "Ramiz Konushevci",
        profilePhoto: "https://randomuser.me/api/portraits/men/73.jpg",
      },
    ],
    comments: [],
    shares: 3,
    isFeeling: "thrilled 😃",
  },
  {
    id: 7,
    userName: "mountainlover",
    userFullName: "Elena Hoxha",
    profilePhoto: "https://randomuser.me/api/portraits/women/91.jpg",

    description:
      "Malësia e bukur e Bjeshkëve të Nemura. Sot u eksploruam pikën më të lartë të Shqipërisë. #Mali #Eksplorim",
    images: ["mountain_peak.jpg"],
    createdAt: new Date("10/13/2023"),
    privacy: "public",
    likes: [],
    comments: [
      {
        id: 1,
        userName: "ramizi123",
        userFullName: "Ramiz Konushevci",
        profilePhoto: "https://randomuser.me/api/portraits/men/73.jpg",
        description:
          "Çdo herë kur shoh këto pamje, më bëhet më mirë për jetën!",
      },
    ],
    shares: 6,
    isFeeling: "happy 😊",
  },
  {
    id: 8,
    userName: "waterlover",
    userFullName: "Liridon Gjokaj",
    profilePhoto: "https://randomuser.me/api/portraits/men/96.jpg",

    description:
      "Frikësohuni nga ngrohësia! Sot e kaluam kohën nën ujërat freskuese të lumit Valbonë. #Natyra #Valbonë",
    images: ["river.jpg"],
    createdAt: new Date("10/14/2023"),
    privacy: "public",
    likes: [],
    comments: [],
    shares: 9,
    isFeeling: "happy 😊",
  },
  {
    id: 9,
    userName: "sportsenthusiast",
    userFullName: "Erik Krasniqi",
    profilePhoto: "https://randomuser.me/api/portraits/men/51.jpg",

    description:
      "Sporti është jeta ime! Sot u përballëm në një ndeshje të pasionuar të volejbollit në plazh. #Sport #Pasion",
    images: ["volleyball.jpg"],
    createdAt: new Date("10/15/2023"),
    privacy: "public",
    likes: [],
    comments: [
      {
        id: 2,
        userName: "maria84",
        userFullName: "Maria Krasniqi",
        profilePhoto: "https://randomuser.me/api/portraits/women/99.jpg",

        description: "Ndeshja ishte e mrekullueshme!",
      },
    ],
    shares: 7,
    isFeeling: "excited 😄",
  },
  {
    id: 10,
    userName: "beachlover",
    userFullName: "Besa Gashi",
    profilePhoto: "https://randomuser.me/api/portraits/women/61.jpg",

    description:
      "Plazhi është vendi më i mirë për t'u relaksuar. Sot u shijua një ditë e mrekullueshme në plazhin e Dhermiut. #Relaksim #Plazh",
    images: ["beach_dhermi.jpg"],
    createdAt: new Date("10/16/2023"),
    privacy: "public",
    likes: [],
    comments: [],
    shares: 12,
    isFeeling: "happy 😊",
  },
];
