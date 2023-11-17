const position = { x: 0, y: 0 };

export const DataCustomFromProject = (arrmain: any) => {
  const arr: any[] = [];
  arr.push(arrmain);
  const dataNodes: any[] = [];
  const dataEdges: any[] = [];

  //Nodes
  const epics = arrmain?.epics;

  const listStorys: any[] = [];

  epics?.forEach((item: any) => {
      item?.storys?.forEach((story: any) => {
          listStorys.push(story);
      })
  })

  const mapNodeProject = arr?.map((item: any) => ({
    id: item?.id,
    data: item,
    position,
    type: 'customNode'
  }))
  const mapNodeEpics = arrmain?.epics?.map((epic: any) => ({
      id: epic?.id,
      data: epic,
      position,
      type: 'customNodeEpic'
  })) ?? []
  const mapNodeStorys = listStorys?.map((story: any) =>({
    id: story?.id,
    data: story,
    position,
    type: 'customNodeStory'
  })) ?? [];
  dataNodes.push(...mapNodeProject,...mapNodeEpics,...mapNodeStorys);

  //Edges
  const mapEdgeProjectWithEpics = arrmain?.epics?.map((item: any) =>({
    id: `start-${item?.projectId}-to-${item?.id}`, 
    source: item?.projectId, 
    target: item?.id, 
    type: 'smoothstep'
  })) ?? [];
  const mapEdgeEpicsWithStorys = listStorys?.map((story: any) =>({
    id: `start-${story?.epicId}-to-${story?.id}`, 
    source: story?.epicId, 
    target: story?.id, 
    type: 'smoothstep'
  })) ?? [];
  dataEdges.push(...mapEdgeProjectWithEpics, ...mapEdgeEpicsWithStorys)
  
  return {
    dataNodes,
    dataEdges
  }
}