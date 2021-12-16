import React from "react"
import SideBar from "../components/sidebar"
import Visited from "../components/visited"

export default function DashboardVisited(){
    return (
        <div className="dashboard">
            <div className="dashboard-container">
                <SideBar />
                <div className="dashboard-body">
                    <Visited />
                </div>
            </div>
        </div>
    )
}