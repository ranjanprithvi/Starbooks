const useBooks = jest.fn().mockReturnValueOnce({
    books: [
        {
            _id: "65987aa9e6b72d92ddcc1754",
            title: "asdf",
            genre: {
                _id: "6363a31891156291b10c0fea",
                __v: 0,
                name: "Fantasy",
            },
            author: {
                _id: "635c226f73691fb5ae1d3eea",
                __v: 0,
                name: "Autocar",
            },
            numberInStock: 0,
            rating: 0,
            yearPublished: 1232,
            coverImage: "",
            description: "akdd",
            __v: 0,
        },
        {
            _id: "651becad552934bbabb7bdd5",
            title: "The Body in the Library",
            genre: {
                _id: "632873144b0bbfc10ae19430",
                __v: 0,
                name: "Mystery",
            },
            author: {
                _id: "632873e706fe265eaee77de9",
                __v: 0,
                name: "Agatha Christie",
            },
            numberInStock: 2,
            rating: 3.83,
            yearPublished: 1945,
            coverImage:
                "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1389733809i/16319.jpg",
            description:
                "It’s seven in the morning. The Bantrys wake to find the body of a young woman in their library. She is wearing evening dress and heavy make-up, which is now smeared across her cheeks.\n\nBut who is she? How did she get there? And what is the connection with another dead girl, whose charred remains are later discovered in an abandoned quarry?\n\nThe respectable Bantrys invite Miss Marple to solve the mystery… before tongues start to wag.",
            __v: 0,
            numberRentedOut: 0,
        },
        {
            _id: "651765abb66bbab77eb9ed5b",
            title: "Murder on the Orient Express",
            genre: {
                _id: "632873144b0bbfc10ae19430",
                __v: 0,
                name: "Mystery",
            },
            author: {
                _id: "632873e706fe265eaee77de9",
                __v: 0,
                name: "Agatha Christie",
            },
            numberInStock: 0,
            rating: 4.2,
            yearPublished: 1934,
            coverImage:
                "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1486131451i/853510.jpg",
            description:
                "Just after midnight, a snowdrift stops the famous Orient Express in its tracks as it travels through the mountainous Balkans. The luxurious train is surprisingly full for the time of the year but, by the morning, it is one passenger fewer. An American tycoon lies dead in his compartment, stabbed a dozen times, his door locked from the inside.\n\nOne of the passengers is none other than detective Hercule Poirot. On vacation.\n\nIsolated and with a killer on board, Poirot must identify the murderer—in case he or she decides to strike again.",
            __v: 0,
            numberRentedOut: 2,
        },
        {
            _id: "651760180012d3fa25b3ddba",
            title: "The Code of the Woosters",
            genre: {
                _id: "632873144b0bbfc10ae1942e",
                __v: 0,
                name: "Comedy",
            },
            author: {
                _id: "632873e706fe265eaee77de8",
                __v: 0,
                name: "P.G Wodehouse",
            },
            numberInStock: 2,
            rating: 4.32,
            yearPublished: 1938,
            coverImage:
                "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1302053718i/9858081.jpg",
            description:
                "Take Gussie Fink-Nottle, Madeline Bassett, old Pop Bassett, the unscrupulous Stiffy Byng, the Rev., an 18th-century cow-creamer, a small brown leather covered notebook and mix with a dose of the aged aunt Dahlia and one has a dangerous brew which spells toil and trouble for Bertie and Jeeves.",
            __v: 0,
            numberRentedOut: 0,
        },
        {
            _id: "651486abc59681a0aa4771ed",
            title: "The Kite Runner",
            genre: {
                _id: "632873144b0bbfc10ae19431",
                __v: 0,
                name: "Fiction",
            },
            author: {
                _id: "63623b7fe54d96d5cc870c5a",
                __v: 0,
                name: "Khaled Hosseini",
            },
            numberInStock: 5,
            rating: 4.34,
            yearPublished: 2003,
            coverImage:
                "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1579036753i/77203.jpg",
            description:
                "1970s Afghanistan: Twelve-year-old Amir is desperate to win the local kite-fighting tournament and his loyal friend Hassan promises to help him. But neither of the boys can foresee what would happen to Hassan that afternoon, an event that is to shatter their lives. After the Russians invade and the family is forced to flee to America, Amir realises that one day he must return to an Afghanistan under Taliban rule to find the one thing that his new world cannot grant him: redemption.",
            __v: 0,
            numberRentedOut: 0,
        },
        {
            _id: "651485f0c59681a0aa4771df",
            title: "Inheritance",
            genre: {
                _id: "6363a31891156291b10c0fea",
                __v: 0,
                name: "Fantasy",
            },
            author: {
                _id: "632873e706fe265eaee77deb",
                __v: 0,
                name: "Christopher Paolini",
            },
            numberInStock: 3,
            rating: 4.13,
            yearPublished: 2011,
            coverImage:
                "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1390886502i/7664041.jpg",
            description:
                "It began with Eragon... It ends with Inheritance.\n\nNot so very long ago, Eragon — Shadeslayer, Dragon Rider — was nothing more than a poor farm boy, and his dragon, Saphira, only a blue stone in the forest. Now the fate of an entire civilization rests on their shoulders.\n\nLong months of training and battle have brought victories and hope, but they have also brought heartbreaking loss. And still, the real battle lies ahead: they must confront Galbatorix. When they do, they will have to be strong enough to defeat him. And if they cannot, no one can. There will be no second chance.\n\nThe Rider and his dragon have come further than anyone dared to hope. But can they topple the evil king and restore justice to Alagaësia? And if so, at what cost?\n\nThis is the spellbinding conclusion to Christopher Paolini's worldwide bestselling Inheritance cycle.",
            __v: 0,
            numberRentedOut: 1,
        },
        {
            _id: "651452f1c59681a0aa477199",
            title: "Brisinger",
            genre: {
                _id: "6363a31891156291b10c0fea",
                __v: 0,
                name: "Fantasy",
            },
            author: {
                _id: "632873e706fe265eaee77deb",
                __v: 0,
                name: "Christopher Paolini",
            },
            numberInStock: 4,
            rating: 4.08,
            yearPublished: 2008,
            coverImage:
                "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1661030683i/2248573.jpg",
            description:
                "It's been only months since Eragon first uttered \"brisingr\", an ancient language term for fire. Since then, he's not only learned to create magic with words — he's been challenged to his very core. Following the colossal battle against the Empires warriors on the Burning Plains, Eragon and his dragon, Saphira, have narrowly escaped with their lives. Still, there is more adventure at hand for the Rider and his dragon, as Eragon finds himself bound by a tangle of promises he may not be able to keep.\n\nFirst is Eragon's oath to his cousin, Roran: to help rescue Roran's beloved from King Galbatorix's clutches. But Eragon owes his loyalty to others, too. The Varden are in desperate need of his talents and strength — as are the elves and dwarves. When unrest claims the rebels and danger strikes from every corner, Eragon must make choices — choices that will take him across the Empire and beyond, choices that may lead to unimagined sacrifice.\n\nEragon is the greatest hope to rid the land of tyranny. Can this once simple farm boy unite the rebel forces and defeat the king?",
            __v: 0,
            numberRentedOut: 0,
        },
        {
            _id: "65145251c59681a0aa47718b",
            title: "Eldest",
            genre: {
                _id: "6363a31891156291b10c0fea",
                __v: 0,
                name: "Fantasy",
            },
            author: {
                _id: "632873e706fe265eaee77deb",
                __v: 0,
                name: "Christopher Paolini",
            },
            numberInStock: 2,
            rating: 4.02,
            yearPublished: 2005,
            coverImage:
                "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1387119654i/45978.jpg",
            __v: 0,
            numberRentedOut: 0,
        },
        {
            _id: "65145107c59681a0aa477174",
            title: "Charlie and the great glass elevator",
            genre: {
                _id: "635a3c7e73691fb5ae1cecd5",
                __v: 0,
                name: "Children",
            },
            author: {
                _id: "635a3d3d73691fb5ae1ced74",
                __v: 0,
                name: "Roald Dahl",
            },
            numberInStock: 5,
            rating: 3.68,
            yearPublished: 1972,
            coverImage:
                "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1309211607i/6687.jpg",
            description:
                "Last seen flying through the sky in a giant elevator in Charlie and the Chocolate Factory, Charlie Bucket's back for another adventure. When the giant elevator picks up speed, Charlie, Willy Wonka, and the gang are sent hurtling through space and time. Visiting the world’' first space hotel, battling the dreaded Vermicious Knids, and saving the world are only a few stops along this remarkable, intergalactic joyride.",
            __v: 0,
            numberRentedOut: 0,
        },
    ],
    setBooks: jest.fn(),
    isLoading: false,
    error: "",
    setError: jest.fn(),
});

export default useBooks;
