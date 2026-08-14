import React, { useContext } from 'react'
import ai from '../assets/ai.png'
import { shopDataContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TbArcheryArrow } from 'react-icons/tb';
function Ai() {
    let {showSearch, setShowSearch}=useContext(shopDataContext)
    let navigate=useNavigate()

    function speak(message){
        let utterence=new SpeechSynthesisUtterance(message)
        window.speechSynthesis.speak(utterence)
    }
    const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = speechRecognition ? new speechRecognition() : null;
    if(!speechRecognition){
        console.log("not supported")
    }
    if (recognition) {
      recognition.onresult=(e)=>{
        const transcript = e.results[0][0].transcript;
        console.log(transcript)
        if(transcript.toLowerCase().includes("search")&& transcript.toLowerCase().includes("open")&& !showSearch){
           speak("opening search")
           setShowSearch(true)
           navigate("/collection")
        }
        else if(transcript.toLowerCase().includes("search")&& transcript.toLowerCase().includes("close")&& showSearch){
            speak("closing search")
            setShowSearch(false)
        }
        else if(transcript.toLowerCase().includes("collection")|| transcript.toLowerCase().includes("collections")|| transcript.toLowerCase().includes("product")|| transcript.toLowerCase().includes("products")){
            speak("opening collection page")
            navigate("/collection")
        }
        else if(transcript.toLowerCase().includes("about")|| transcript.toLowerCase().includes("aboutpage")){
            speak("opening about page")
            navigate("/about")
            setShowSearch(false)
        }
        else if(transcript.toLowerCase().includes("home")|| transcript.toLowerCase().includes("homepage")){
            speak("opening home page")
            navigate("/")
            setShowSearch(false)
        }
        else if(transcript.toLowerCase().includes("cart")|| transcript.toLowerCase().includes("kaat") || transcript.toLowerCase().includes("caat")){
            speak("opening your cart")
            navigate("/cart")
            setShowSearch(false)
        }
        else if(transcript.toLowerCase().includes("contact")){
            speak("opening contact page")
            navigate("/contact")
            setShowSearch(false)
        }
        else if(transcript.toLowerCase().includes("order")|| transcript.toLowerCase().includes("myorders") || transcript.toLowerCase().includes("orders")|| transcript.toLowerCase().includes("my order") ){
            speak("opening your order page")
            navigate("/order")
            setShowSearch(false)
        }else{
            toast.error("Try Again")
        }
      }
    }
  return (
    <>
      <div className="fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%]" onClick={()=>{
        recognition?.start()
      }}>
        <img src={ai} alt="" className='w-[100px] hover:w-[105px] cursor-pointer'/>
      </div>
      <ToastContainer />
    </>
  )
}

export default Ai