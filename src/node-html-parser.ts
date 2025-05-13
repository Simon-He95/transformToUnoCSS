import { parse } from 'node-html-parser'

export function nodeHtmlParser(code: string, selector: string, stack?: any[]) {
  const results: any[] = []
  if (!stack || !stack.length)
    return results
  const root = parse(code)
  let elements: any[] = []
  try {
    elements = root.querySelectorAll(selector)
  }
  catch (error) {}

  while (elements.length === 0 && selector.includes(':')) {
    // 从: 往前截取匹配因为可能有 :hover等伪类
    const index = selector.lastIndexOf(':')
    selector = selector.slice(0, index)
    try {
      elements = root.querySelectorAll(selector)
    }
    catch (error) {}
  }
  if (elements.length) {
    // 从 elements 的range 去匹配 stack 的 ast 节点
    elements.forEach((element) => {
      const targetNode = getMatchNode(element.range, stack)
      if (targetNode) {
        results.push(targetNode)
      }
    })
  }
  return results
}

export function getMatchNode(
  range: Readonly<[number, number]>,
  elements: any[],
): any {
  for (const element of elements) {
    const { start, end } = element.loc
    if (range[0] === start.offset && range[1] === end.offset) {
      return element
    }
    else if (element.children && element.children.length) {
      const match = getMatchNode(range, element.children)
      if (match) {
        return match
      }
    }
  }
}
