import { ElementDefinition, Stylesheet, BreadthFirstLayoutOptions } from "cytoscape";
import { useCallback, useRef } from "react";

import { GraphType, LinkItemType, NodeItemType } from "./types";

const useGraph = (data: GraphType) => {

  const graphs = useRef<{
    elements: ElementDefinition[]
    style: Stylesheet[]
    layout?: BreadthFirstLayoutOptions
  } | null>()

  const normalizeGraph = (nodeItem: NodeItemType): ElementDefinition => {
    const { id, name, type, } = nodeItem
    return {
      data: {
        id: JSON.stringify(id),
        label: `${type} ${name}`,
        name,
      },
      ...(type?.toLowerCase() ? { classes: [type.toLowerCase()] } : null)
    }
  }

  const normalizeLink = (nodeItem: LinkItemType): ElementDefinition => {
    const { target, source, arrows = false } = nodeItem
    return {
      data: {
        target,
        source,
      },
      ...(arrows ? { style: { 'target-arrow-shape': 'vee' } } : null)
    }
  }

  const createGraphs = useCallback((data: GraphType) => {

    const links = data.links.map(link => normalizeLink(link))
    const nodes = data.nodes.map(graph => normalizeGraph(graph))

    return [...nodes, ...links]
  }, [])


  graphs.current = {
    elements: [...createGraphs(data)],
    style: [
      {
        selector: 'node',
        style: {
          'background-color': '#fff',
          'label': 'data(label)',
          'border-width': 1
        }
      },
      {
        selector: '.organization',
        style: {
          'background-image': 'https://static.vecteezy.com/system/resources/previews/017/779/375/original/organization-icon-sign-symbol-graphic-illustration-vector.jpg',
          'background-fit': 'contain',
          


        }
      },
      {
        selector: '.address',
        style: {
          'background-image': 'https://cdn-icons-png.flaticon.com/512/3095/3095581.png',
          'background-fit': 'contain'


        }
      },
      {
        selector: '.person',
        style: {
          'background-image': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBWm3OqLISX2Nj8CZTTd-6FrX3QiXlZ8_YaA&usqp=CAU',
          'background-fit': 'contain'
        }
      },
      {
        selector: 'edge',
        style: {
          width: 1,
          'line-color': '#000',
          'target-arrow-color': '#000',
          'curve-style': 'bezier',
        },
      },
    ],
    layout: {
      name: "breadthfirst",
      fit: true,
      circle: true,
      directed: true,
      padding: 50,
      spacingFactor: 3,
      animate: true,
      animationDuration: 1000,
      avoidOverlap: true,
      nodeDimensionsIncludeLabels: false
    }
  }

  return {
    createGraphs,
    normalizeGraph,
    graphs
  }
}

export default useGraph;
