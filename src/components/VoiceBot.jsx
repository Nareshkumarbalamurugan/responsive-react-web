
import { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner';

const VoiceBot = () => {
  const [actionResponse, setActionResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const { addToCart, clearCart } = useCart();
  
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  // Extract product name from commands like "add apple to cart"
  const extractProductFromCommand = (command) => {
    // Simple extraction - can be enhanced later
    if (command.includes('add') && command.includes('to cart')) {
      const productName = command.replace('add', '').replace('to cart', '').trim();
      return productName || 'product';
    }
    return 'product';
  };

  // Voice commands mapping
  const handleVoiceCommand = async (command) => {
    setIsProcessing(true);
    try {
      // Navigation commands
      if (command.includes('go to home') || command.includes('home page')) {
        setActionResponse('Navigating to home page');
        navigate('/');
      }
      else if (command.includes('go to shop') || command.includes('shop page')) {
        setActionResponse('Navigating to shop page');
        navigate('/shop');
      }
      else if (command.includes('go to cart') || command.includes('shopping cart')) {
        setActionResponse('Opening your cart');
        navigate('/cart');
      }
      else if (command.includes('go to categories') || command.includes('show categories')) {
        setActionResponse('Showing categories');
        navigate('/categories');
      }
      else if (command.includes('go to about') || command.includes('about page')) {
        setActionResponse('Navigating to about page');
        navigate('/about');
      }
      else if (command.includes('go to profile') || command.includes('my profile')) {
        setActionResponse('Opening your profile');
        navigate('/profile');
      }
      else if (command.includes('go to payment') || command.includes('checkout')) {
        setActionResponse('Proceeding to payment');
        navigate('/payment');
      }
      
      // Search functionality
      else if (command.includes('search')) {
        const searchQuery = command.replace('search', '').trim();
        if (searchQuery) {
          setActionResponse(`Searching for: ${searchQuery}`);
          navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
        } else {
          setActionResponse('Please specify what to search for');
        }
      }
      
      // Cart operations (simplified for demo)
      else if (command.includes('add') && command.includes('to cart')) {
        const product = extractProductFromCommand(command);
        setActionResponse(`Adding ${product} to cart`);
        
        // Mock adding to cart - in a real app, you'd need to fetch the product first
        const mockProduct = {
          id: Math.floor(Math.random() * 1000),
          name: product,
          price: 99,
          image: 'https://images.unsplash.com/photo-1584473457409-ce85152af916'
        };
        
        addToCart(mockProduct);
        toast.success(`Added ${product} to cart`);
      }
      else if (command.includes('clear cart') || command.includes('empty cart')) {
        setActionResponse('Clearing your cart');
        clearCart();
        toast.success('Cart cleared');
      }
      
      // Help command
      else if (command.includes('help') || command.includes('what can you do')) {
        setActionResponse(`
          I can help you with:
          • Navigation: "go to [home/shop/cart/etc]"
          • Search: "search for apples"
          • Cart: "add [product] to cart", "clear cart"
          • Other: "help", "what can you do"
        `);
      }
      
      // Unknown command
      else {
        setActionResponse("I didn't understand that. Try saying 'help' or 'what can you do' to see available commands.");
      }
    } catch (error) {
      console.error('Voice command error:', error);
      setActionResponse("Sorry, I encountered an error processing your request");
    } finally {
      setIsProcessing(false);
    }
  };

  // Process transcript when listening stops
  useEffect(() => {
    if (transcript && !listening) {
      handleVoiceCommand(transcript.toLowerCase());
      resetTranscript();
    }
  }, [listening, transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <div className="fixed bottom-4 right-4 bg-white p-3 rounded-lg shadow-lg">
      Your browser doesn't support speech recognition
    </div>;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {actionResponse && (
        <div className="absolute bottom-16 right-0 bg-white p-4 rounded-lg shadow-lg max-w-xs mb-2 text-left">
          <p className="text-sm">{actionResponse}</p>
        </div>
      )}
      
      {isProcessing && (
        <div className="absolute bottom-16 right-0 bg-white px-4 py-2 rounded-lg shadow-lg mb-2">
          <p className="text-sm text-gray-600">Processing...</p>
        </div>
      )}
      
      <button
        className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${
          listening 
            ? 'bg-red-500 hover:bg-red-600 scale-110' 
            : 'bg-brandGreen hover:bg-opacity-90'
        }`}
        onClick={() => listening 
          ? SpeechRecognition.stopListening() 
          : SpeechRecognition.startListening({ continuous: false })
        }
        aria-label="Voice Assistant"
      >
        {listening 
          ? <FaMicrophoneSlash className="text-white text-xl" /> 
          : <FaMicrophone className="text-white text-xl" />
        }
      </button>
    </div>
  );
};

export default VoiceBot;
