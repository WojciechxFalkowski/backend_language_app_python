import { createServer } from "miragejs"

const createMockTests = () => {
    return [
        {
            id: 0,
            name: 'First test',
            items: [
                {
                    id: 1,
                    question: 'skromny',
                    answer: 'modest',
                    points: {
                        positive: 5,
                        negative: 2,
                    }
                },
                {
                    id: 2,
                    question: 'ponury',
                    answer: 'morose',
                    points: {
                        positive: 0,
                        negative: 0,
                    }
                },
                {
                    id: 3,
                    question: 'zawzięty',
                    answer: 'obstinate',
                    points: {
                        positive: 0,
                        negative: 0,
                    }
                },
                {
                    id: 4,
                    question: 'uparty jak osioł',
                    answer: 'pig-headed',
                    points: {
                        positive: 0,
                        negative: 0,
                    }
                },
            ]
        },
        {
            id: 1,
            name: 'Second test',
            items: [
                {
                    id: 1,
                    question: 'skromny',
                    answer: 'modest',
                    points: {
                        positive: 0,
                        negative: 0,
                    }
                },
                {
                    id: 2,
                    question: 'ponury',
                    answer: 'morose',
                    points: {
                        positive: 0,
                        negative: 0,
                    }
                },
                {
                    id: 3,
                    question: 'zawzięty',
                    answer: 'obstinate',
                    points: {
                        positive: 0,
                        negative: 0,
                    }
                },
                {
                    id: 4,
                    question: 'uparty jak osioł',
                    answer: 'pig-headed',
                    points: {
                        positive: 0,
                        negative: 0,
                    }
                },
            ]
        },
        {
            id: 2,
            name: 'Third test',
            items: [
                {
                    id: 1,
                    question: 'skromny',
                    answer: 'modest',
                    points: {
                        positive: 0,
                        negative: 0,
                    }
                },
                {
                    id: 2,
                    question: 'ponury',
                    answer: 'morose',
                    points: {
                        positive: 0,
                        negative: 0,
                    }
                },
                {
                    id: 3,
                    question: 'zawzięty',
                    answer: 'obstinate',
                    points: {
                        positive: 0,
                        negative: 0,
                    }
                },
                {
                    id: 4,
                    question: 'uparty jak osioł',
                    answer: 'pig-headed',
                    points: {
                        positive: 0,
                        negative: 0,
                    }
                },
            ]
        }
    ]
}

export const createMockServer = () => {
    if (window.server) {
        server.shutdown()
    }

    window.server = createServer({
        routes() {
            this.get("/api/movies", () => {
                return {
                    movies: [
                        { id: 1, name: "Inception", year: 2010 },
                        { id: 2, name: "Interstellar", year: 2014 },
                        { id: 3, name: "Dunkirk", year: 2017 },
                    ],
                }
            }),
                this.get('/api/tests/1', () => {
                    return {
                        data: createMockTests()[0]
                    }
                }),
                this.get('/api/tests', () => {
                    return {
                        data: createMockTests()
                    }
                })
        },
    })
}
