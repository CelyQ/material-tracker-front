import React from 'react'
import classnames from 'classnames'
import PrimarySearchAppBar from './components/ApplicationTopBar'
import { useAppSelector } from './redux/hooks'

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import { firebaseConfig } from './configs/firebase'
import CircularStatic from './components/CircularProgressWithLabel'

firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()
const firestore = firebase.firestore()

export default function App() {
    const isDarkMode = useAppSelector(state => state.themeSwitcher.darkMode)
    const [user] = useAuthState(auth)

    const materialsRef = firestore.collection('materials')
    const query = materialsRef.orderBy('id').limit(25)

    type Material = {
        id: number
        name: string
        imageURL: string
        pagesTotal: number
        pagesProgress: number
    }
    const [materials] = useCollectionData<Material>(query, { idField: 'id' })

    return (
        <div className={classnames('App', { dark: isDarkMode })}>
            <div className="w-full bg-gray-300 dark:bg-gray-800 bg-opacity-20">
                <div className="bg-white dark:bg-gray-700 dark:bg-opacity-70 md:container md:mx-auto h-full min-h-screen shadow-2xl rounded-md">
                    <PrimarySearchAppBar />

                    <div className="w-full my-6">
                        <div className="w-4/6 mx-auto">
                            {materials?.map((m, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-3 bg-gray-100 bg-opacity-60 shadow-xl my-4 rounded-lg"
                                >
                                    <div className="grid col-span-1">
                                        <div className="grid grid-rows-4 grid-flow-col place-items-center shadow-sm">
                                            <img src={m.imageURL} alt="" className="row-span-4 p-2 h-48 w-40" />
                                        </div>
                                    </div>
                                    <div className="grid col-span-2">
                                        <div className="grid grid-rows-4 grid-flow-col place-content-start bg-gray-200 bg-opacity-20 shadow-sm">
                                            <h2 className="row row-span-2 text-lg text-center p-2 font-bold my-auto px-8">
                                                {m.name}
                                            </h2>
                                            <div className="row-span-2 p-2 flex items-center text-md font-mono px-8">
                                                <div className="grid grid-cols-2 place-items-center">
                                                    <h4>
                                                        Pages: {m.pagesProgress}/{m.pagesTotal}
                                                    </h4>
                                                    <CircularStatic value={(m.pagesProgress / m.pagesTotal) * 100} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
