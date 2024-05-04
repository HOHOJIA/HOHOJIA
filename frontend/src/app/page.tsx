import Image from 'next/image'
import Home from '@/app/components/home/Home'
import Header from './components/Header'
import Footer from './components/Footer'

export default function Index() {
    return (
        <main className="">
            <Header />
            <Home />
            <Footer />
        </main>
    )
}
