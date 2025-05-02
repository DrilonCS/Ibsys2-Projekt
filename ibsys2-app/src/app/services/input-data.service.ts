import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, ReplaySubject } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';

export interface ForecastData {
  p1: number;
  p2: number;
  p3: number;
}

export interface WarehouseStockItem {
  id: number;
  amount: number;
  startamount: number;
  pct: number;
  price: number;
  stockvalue: number;
}

export interface WaitingListItem {
  id: number;
  timeneed: number;
}

export interface OrderInWorkItem {
  id: number;
  amount: number;
  timeneed: number;
}

export interface MaterialRequirement {
  id: string;
  productionOrder: number;
  previousQueue: number;
  safetyStock: number;
  warehouseStock: number;
  currentQueue: number;
  workInProgress: number;
  calculatedRequirement: number;
}

// Define product-component mapping
export const PRODUCT_COMPONENTS = {
  p1: ['E26', 'E51', 'E16', 'E17', 'E50'], // Example components for P1 (Kinderrad)
  p2: ['E26', 'E56', 'E16', 'E17', 'E55'], // Example components for P2 (Damenrad)
  p3: ['E26', 'E31', 'E16', 'E17', 'E30']  // Example components for P3 (Herrenrad)
};

// Define safety stock levels for components
export const SAFETY_STOCK = {
  'E26': 100,
  'E51': 100,
  'E16': 100,
  'E17': 100,
  'E50': 100,
  'E56': 100,
  'E55': 100,
  'E31': 100,
  'E30': 100
};

@Injectable({ providedIn: 'root' })
export class InputDataService {
  private xmlData: Document | null = null;
  private xmlCache$ = new ReplaySubject<Document>(1);

  constructor(private http: HttpClient) {}

  private loadXmlData(): Observable<Document> {
    if (this.xmlData) {
      return of(this.xmlData);
    }

    return this.http.get('assets/firstInputData.xml', { responseType: 'text' }).pipe(
      map(xmlStr => {
        const parser = new DOMParser();
        return parser.parseFromString(xmlStr, 'application/xml');
      }),
      tap(xml => {
        this.xmlData = xml;
        this.xmlCache$.next(xml);
      }),
      shareReplay(1)
    );
  }

  getForecast(): Observable<ForecastData> {
    return this.loadXmlData().pipe(
      map(xml => {
        const forecast = xml.querySelector('forecast');
        console.log('GEFUNDENER FORECAST:', forecast?.getAttribute('p1'));
        const p1 = Number(forecast?.getAttribute('p1'));
        const p2 = Number(forecast?.getAttribute('p2'));
        const p3 = Number(forecast?.getAttribute('p3'));
        console.log('Forecast parsed as numbers:', { p1, p2, p3 });
        return { p1, p2, p3 };
      })
    );
  }

  getWarehouseStock(): Observable<WarehouseStockItem[]> {
    return this.loadXmlData().pipe(
      map(xml => {
        const stockItems = xml.querySelectorAll('warehousestock > article');
        const result: WarehouseStockItem[] = [];

        stockItems.forEach(item => {
          result.push({
            id: Number(item.getAttribute('id')),
            amount: Number(item.getAttribute('amount')),
            startamount: Number(item.getAttribute('startamount')),
            pct: Number(item.getAttribute('pct')?.replace('%', '')),
            price: Number(item.getAttribute('price')),
            stockvalue: Number(item.getAttribute('stockvalue'))
          });
        });

        return result;
      })
    );
  }

  getWaitingList(): Observable<WaitingListItem[]> {
    return this.loadXmlData().pipe(
      map(xml => {
        const waitingItems = xml.querySelectorAll('waitinglistworkstations > workplace');
        const result: WaitingListItem[] = [];

        waitingItems.forEach(item => {
          result.push({
            id: Number(item.getAttribute('id')),
            timeneed: Number(item.getAttribute('timeneed'))
          });
        });

        return result;
      })
    );
  }

  getOrdersInWork(): Observable<OrderInWorkItem[]> {
    return this.loadXmlData().pipe(
      map(xml => {
        const ordersInWork = xml.querySelectorAll('ordersinwork > workplace');
        const result: OrderInWorkItem[] = [];

        ordersInWork.forEach(item => {
          result.push({
            id: Number(item.getAttribute('id')),
            amount: Number(item.getAttribute('amount')),
            timeneed: Number(item.getAttribute('timeneed'))
          });
        });

        return result;
      })
    );
  }

  // Calculate material requirements based on the formula
  calculateMaterialRequirements(productId: string, productionOrder: number): Observable<MaterialRequirement[]> {
    const components = PRODUCT_COMPONENTS[productId as keyof typeof PRODUCT_COMPONENTS] || [];

    // Safety factor is 50% of forecast
    const safetyFactor = 1.5;

    return this.loadXmlData().pipe(
      map(xml => {
        const warehouseStock = this.parseWarehouseStock(xml);
        const waitingList = this.parseWaitingList(xml);
        const ordersInWork = this.parseOrdersInWork(xml);

        return components.map(componentId => {
          const stock = warehouseStock.find(item => item.id.toString() === componentId.replace('E', '')) ||
                        { amount: 0 };
          const queue = waitingList.find(item => item.id.toString() === componentId.replace('E', '')) ||
                       { timeneed: 0 };
          const inWork = ordersInWork.find(item => item.id.toString() === componentId.replace('E', '')) ||
                        { amount: 0 };

          // Calculate safety stock as 50% of the production order (forecast)
          const safetyStock = Math.round(productionOrder * safetyFactor);
          const previousQueue = 0; // This would need to be retrieved from previous period data

          // Calculate requirement using the formula:
          // Produktionsauftrag + vorherige Warteschlange + Sicherheitsbestand - Lagerbestand - aktuelle Warteschlange - laufende Arbeiten
          const calculatedRequirement = Math.max(0,
            productionOrder +
            previousQueue +
            safetyStock -
            stock.amount -
            queue.timeneed -
            inWork.amount
          );

          return {
            id: componentId,
            productionOrder: productionOrder,
            previousQueue: previousQueue,
            safetyStock: safetyStock,
            warehouseStock: stock.amount,
            currentQueue: queue.timeneed,
            workInProgress: inWork.amount,
            calculatedRequirement: calculatedRequirement
          };
        });
      })
    );
  }

  private parseWarehouseStock(xml: Document): WarehouseStockItem[] {
    const stockItems = xml.querySelectorAll('warehousestock > article');
    const result: WarehouseStockItem[] = [];

    stockItems.forEach(item => {
      result.push({
        id: Number(item.getAttribute('id')),
        amount: Number(item.getAttribute('amount')),
        startamount: Number(item.getAttribute('startamount')),
        pct: Number(item.getAttribute('pct')?.replace('%', '')),
        price: Number(item.getAttribute('price')),
        stockvalue: Number(item.getAttribute('stockvalue'))
      });
    });

    return result;
  }

  private parseWaitingList(xml: Document): WaitingListItem[] {
    const waitingItems = xml.querySelectorAll('waitinglistworkstations > workplace');
    const result: WaitingListItem[] = [];

    waitingItems.forEach(item => {
      result.push({
        id: Number(item.getAttribute('id')),
        timeneed: Number(item.getAttribute('timeneed'))
      });
    });

    return result;
  }

  private parseOrdersInWork(xml: Document): OrderInWorkItem[] {
    const ordersInWork = xml.querySelectorAll('ordersinwork > workplace');
    const result: OrderInWorkItem[] = [];

    ordersInWork.forEach(item => {
      result.push({
        id: Number(item.getAttribute('id')),
        amount: Number(item.getAttribute('amount') || '0'),
        timeneed: Number(item.getAttribute('timeneed') || '0')
      });
    });

    return result;
  }
}
