import { RNode } from "./RNode";
import readRppChunk from "./readRpp/readRppChunk";
import stringifyRppNode from "./writeRpp/stringifyRppNode";
import splitMultiLinesStrToTab from "./utils/splitMultiLinesStrToTab";
import addRNode from "./createRpp/addRNode";

export class RChunk extends RNode {
  findFirstNodeByName(name: string, start_index?: number, end_index?: number) {
    if (!this.children) {
      return false;
    }
    this.children?.forEach((child, i) => {
      if (
        (!start_index || i >= start_index) &&
        (!end_index || i <= end_index)
      ) {
        if (child.getName() == name) {
          return child;
        }
      }
    });
  }

  findFirstChunkByName(
    name: string,
    start_index?: number,
    end_index?: number
  ): RChunk | null {
    this.children?.forEach((child, i: number) => {
      if (
        (!start_index || i >= start_index) &&
        (!end_index || i <= end_index)
      ) {
        if (child instanceof RChunk) {
          if (child.getName() == name) {
            return child;
          }
        }
      }
    });
    return null;
  }

  findAllNodesByFilter(filter: any, start_index?: number, end_index?: number) {
    let out: any[] = [];
    // finds child tags that match the filter function
    this.children?.forEach((child, i: number) => {
      if (
        (!start_index || i >= start_index) &&
        (!end_index || i <= end_index)
      ) {
        if (filter(child)) {
          // This looks wrong - filter should check each child
          // filter accepted this node so add to results
          out.push(child);
        }
      }
    });
    return out;
  }

  findAllChunksByFilter(
    filter: any,
    out: any[] = [],
    start_index: number,
    end_index: number
  ) {
    // give this an empty table for out to fill when calling {
    // finds child tags that match the filter function
    this.children?.forEach((child, i: number) => {
      if (
        (!start_index || i >= start_index) &&
        (!end_index || i <= end_index)
      ) {
        if (child instanceof RChunk) {
          if (filter(child)) {
            // This looks wrong - filter should check each child
            // filter accepted this node so add to results
            out.push(child);
          }
        }
      }
    });
    return out;
  }

  findAllNodesByName(name: string, start_index: number, end_index: number) {
    let filter = function (node: RNode) {
      return node.getName() === name;
    };
    return this.findAllNodesByFilter(filter, start_index, end_index);
  }

  findAllChunksByName(name: string, start_index: number, end_index: number) {
    // find child chunk with specified name (non recursive) {
    let filter = function (node: RNode) {
      return node.getName() === name;
    };
    return this.findAllChunksByFilter(
      filter,
      undefined,
      start_index,
      end_index
    );
  }

  indexOf(node: RNode) {
    this.children?.forEach((child, i: number) => {
      if (node === child) {
        return i;
      }
    });
    return -1;
  }

  getTextNotes() {
    let table = [];
    this.children?.forEach((child, i: number) => {
      table[i] = child.line?.substr(1); // remove |
    });
    return table.push("\n");
  }

  setTextNotes(text: string) {
    let table = text.split("\n"); // splitMultiLinesStrToTab(text);
    this.children = []; // reset children
    table.forEach((line) => {
      addRNode(this, `|${line}`);
    });
    return this.children;
  }

  addNode(node: RNode) {
    if (!this.children) {
      this.children = [];
    }
    node.parent = this;
    this.children?.push(node);
    return node;
  }

  removeNode(node: RNode) {
    this.children?.forEach((child) => {
      if (node == child) {
        debugger;
        // this.children?.remove(node); // array remove specific element
        node.parent = null;
        return true;
      }
    });
    return false;
  }

  stripGUID() {
    // Reset all GUID to let REAPER generates new ones
    let node_GUID = this.findFirstChunkByName("GUID");
    if (node_GUID) {
      node_GUID.remove();
    }
    let node_IGUID = this.findFirstChunkByName("IGUID");
    if (node_IGUID) {
      node_IGUID.remove();
    }
    let node_TRACKID = this.findFirstChunkByName("TRACKID");
    if (node_TRACKID) {
      node_TRACKID.remove();
    }
    // TODO Support even more GUID types like markers
  }

  copy(parent?: RChunk | null) {
    let chunk = readRppChunk(stringifyRppNode(this));
    if (!parent) {
      parent = this.parent;
    }

    if (parent && chunk) {
      return parent.addNode(chunk);
    } else {
      return null;
    }
  }
}
