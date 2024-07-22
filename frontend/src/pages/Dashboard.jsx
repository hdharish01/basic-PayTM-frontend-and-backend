import { AppBar } from "../components/AppBar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"

export function Dashboard(){
    return <div>
              <AppBar />
              <div className="mt-8 ml-4">
                <Balance value={10000}/> 
                <Users /> 
              </div>       
    </div>
}