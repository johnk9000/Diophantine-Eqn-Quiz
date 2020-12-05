import React from "react"

export function MathIntro() {
    return(
        <div id ="preamble">
           <h1 id="frameOne" style="--animation-order: 1">Diaphantine Geometry</h1>
           <p id="frameTwo" style="--animation-order: 2">Here you will be solving the 1st order diaphantine equation: </p>
           <p id="frameThree" style="--animation-order: 3">x<sup>2</sup>  -  n &#183 y<sup>2</sup> = 1</p>
           <p id="frameFour" style="--animation-order: 4"> where n is any positive whole number</p>
        </div>
    )
}