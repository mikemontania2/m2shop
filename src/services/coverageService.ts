import coberturaData from "../data/cobertura.json"

export interface CoverageArea {
  id: string
  name: string
  color: string
  weight: number
  fillOpacity: number
  coordinates: [number, number][]
}

class CoverageService {
  private readCoverage(): CoverageArea[] {
    const saved = localStorage.getItem("coverage")
    return saved ? (JSON.parse(saved) as CoverageArea[]) : (coberturaData as CoverageArea[])
  }

  private writeCoverage(list: CoverageArea[]): void {
    localStorage.setItem("coverage", JSON.stringify(list))
  }

  getCoverage(): CoverageArea[] {
    return this.readCoverage()
  }

  getCoverageById(id: string): CoverageArea | undefined {
    return this.readCoverage().find((a) => a.id === id)
  }

  upsertArea(area: CoverageArea): void {
    const list = this.readCoverage()
    const idx = list.findIndex((a) => a.id === area.id)
    if (idx >= 0) {
      list[idx] = area
    } else {
      list.push(area)
    }
    this.writeCoverage(list)
  }

  deleteArea(areaId: string): void {
    const list = this.readCoverage().filter((a) => a.id !== areaId)
    this.writeCoverage(list)
  }
}

export default new CoverageService()
