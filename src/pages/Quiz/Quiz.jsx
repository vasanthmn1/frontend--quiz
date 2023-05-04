import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const Quiz = () => {
    const params = useParams()
    const { link } = useSelector((state) => state.link)


    const [result, setResult] = useState({
        score: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        perAnswers: 100,
    })



    const [activeno, setActiveno] = useState(0)
    const [find, setFind] = useState({})
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
    const [selectedAnswer, setSelectedAnswer] = useState('')
    const [showResult, setShowResult] = useState(false)

    useEffect(() => {
        ques()
    }, [])

    const ques = async () => {
        const getdata = await axios.get(`${link}/admin/get`)

        const finddata = getdata.data.find(value => value._id == params.id)
        setFind(finddata)
        console.log(finddata);
    }

    const { question, choices, correctAnswer } = find.questions?.[activeno] || {}

    const addButton = () => {

        setSelectedAnswerIndex(null)
        setResult((prev) =>
            selectedAnswer
                ? {
                    ...prev,
                    score: prev.score + 1,
                    correctAnswers: prev.correctAnswers + 1,
                    perAnswers: Math.round((prev.score / find.questions.length) * 100)

                }
                : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
        )


        if (activeno !== question.length - 1) {

            setActiveno((prev) => prev + 1)

        } else {
            setActiveno(0)
            setShowResult(true)

        }


    }
    const onAnswerSelected = (answer, index) => {
        setSelectedAnswerIndex(index)
        if (answer === correctAnswer) {
            setSelectedAnswer(true)
        } else {
            setSelectedAnswer(false)
        }
    }
    console.log(correctAnswer);
    const sum = () => {

        setSelectedAnswerIndex(null)
        setResult((prev) =>
            selectedAnswer
                ? {
                    ...prev,
                    score: prev.score + 1,
                    correctAnswers: prev.correctAnswers + 1,
                    perAnswers: Math.round((prev.score / find.questions.length) * 100)
                }
                : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
        )

        setShowResult(true)
    }
    return (
        <div>
            {
                !showResult ?
                    (
                        <div>
                            {question && <h1>{question}</h1>}


                            {
                                choices?.map((val, idx) => {
                                    return (
                                        <>
                                            <p
                                                onClick={() => onAnswerSelected(val, idx)}
                                                className={
                                                    selectedAnswerIndex === idx ? 'selected-answer' : null
                                                }


                                            >{val}</p>
                                        </>
                                    )
                                })
                            }
                            {activeno >= 1 ?
                                <button>back</button> : null
                            }
                            {/* <button onClick={() => addButton()}

                            >
                                {activeno === (find.questions?.length - 1) ? 'Finish' : 'Next'}
                            </button> */}
                            {activeno === (find.questions?.length - 1) ?
                                <button onClick={() => sum()}>Sumite</button>

                                :
                                <button


                                    onClick={() => addButton()}

                                >NExt</button>}
                        </div>
                    ) :
                    <div className="result">
                        <h3>Result</h3>
                        <p>
                            Total Question: <span>{find.questions?.length}</span>
                        </p>
                        <p>
                            Total Score:<span> {result.score}</span>
                        </p>
                        <p>
                            Correct Answers:<span> {result.correctAnswers}</span>
                        </p>
                        <p>
                            Percentage <span> {result.perAnswers}</span>
                        </p>
                        <p>
                            Wrong Answers:<span> {result.wrongAnswers}</span>
                        </p>
                    </div>
            }
        </div>

    )
}

export default Quiz
