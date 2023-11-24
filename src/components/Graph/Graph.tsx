
import Cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";
import { useState } from "react";
import CytoscapeComponent from "react-cytoscapejs";

import useGraph from "./useGraph";
import data from '../../data.json'

import styles from './styles.module.scss'

Cytoscape.use(dagre);
const GraphDashboard = () => {
  const { graphs } = useGraph(data)
  const [layout, setLayout] = useState(graphs.current?.layout)

  const diagramButtonLabel = !layout?.circle ? 'circle graph' : 'liner graph'

  const changeDiagramView = () => {
    setLayout(prev => prev && ({ ...prev, circle: !prev?.circle })
    )
  }
  return (
    <>
      <button className={styles.button} onClick={changeDiagramView}>{diagramButtonLabel}</button>
      {
        graphs.current ?
          <CytoscapeComponent
            stylesheet={graphs.current.style}
            className={styles.graph}
            elements={graphs.current?.elements}
            layout={layout}
          />
          : null
      }
    </>
  )
}


export default GraphDashboard;
