import {BrowserRouter, Route, Routes} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route 
              path="/"
              
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
