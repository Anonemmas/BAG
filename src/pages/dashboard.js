import React from "react"
import SideBar from "../components/sidebar"
import MyList from "../components/mylist"

export default function Dashboard(){
    return (
        <div className="dashboard">
            <div className="dashboard-container">
                <SideBar />
                <div className="dashboard-body">
                    <MyList />
                </div>
            </div>
        </div>
    )
}