import React, { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from './db';
import './App.css';
import { makeGetRequest, makePostRequest } from './api';

type OrderListProp = {
  status: string;
}

export function OrderList({status}: OrderListProp) {
  const ordersLiveQuery = useLiveQuery(
    async () => {
      //
      // Query Dexie's API
      //
      const orders = await db.orders
        .where('status')
        .equals(status)
        .toArray();

      // Return result
      return orders;
    },
    // specify vars that affect query:
    [status] 
  );

  return <ul>
    {ordersLiveQuery?.map(order => <li key={order.id}>
      {order.orderNumber}, {order.status}
    </li>)}
  </ul>;
}

function App() {
  const [count, setCount] = useState<number>(50000000);
  const [orderNumber, setOrderNumber] = useState(Math.random().toString().split('.')[1]);
  const [status, setStatus] = useState('not_synced');
  const [message, setMessage] = useState('');

  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    navigator.serviceWorker.ready.then(function (sw) {
      // //@ts-ignore
      // const tags = sw.sync.getTags();
      // tags.then(function (v: any) {
      //   console.table(v);
      // })

      // push notification
      Notification.requestPermission()
        .then(function (result) {
          if (result === 'denied') {
            console.log('The user explicitly denied the permission request.');
          }
          if (result === 'granted') {
            console.info('The user accepted the permission request.');
          }
      })
    });
  }

  // const deliverOrderWithoutWorkBox = async () => {
  //   try {

  //     // Add the new friend!
  //     const id = await db.orders.add({
  //       orderNumber,
  //       status,
  //       message
  //     });

  //     setMessage(`Order for ${orderNumber} successfully added. Got id: ${id}`);
  //     setOrderNumber(Math.random().toString().split('.')[1]);
  //     alert("Order saved successfully to local DB!");
  //     if ('serviceWorker' in navigator && 'SyncManager' in window) {
  //       navigator.serviceWorker.ready
  //         .then(function (sw) {
  //           //@ts-ignore
  //           return sw.sync.register(`not-synced-order-tag`);
  //         })
  //         .then(function() {
  //           console.log(`tag${orderNumber} has been registered`);
  //         })
  //         .catch(function(e) {
  //           console.error(e);
  //         })
  //     }
  //   } catch (error) {
  //     setMessage(`Failed to add order for ${orderNumber}: ${error}`);
  //   }
  // }

  const deliverOrderWithWorkBox = async () => {
    try {

      // Add the new friend!
      const id = await db.orders.add({
        orderNumber,
        status,
        message
      });

      setMessage(`Order for ${orderNumber} successfully added. Got id: ${id}`);
      setOrderNumber(Math.random().toString().split('.')[1]);
      try {
        const orderSaved = await db.orders.get(id);
        const response = await makePostRequest(orderSaved);
        if (orderSaved && response?.ok) {
          db.orders.update(orderSaved, {status: 'synced'});
        }
      } catch (error) {
        
      }
      
    } catch (error) {
      setMessage(`Failed to add order for ${orderNumber}: ${error}`);
      alert("Order saved successfully to local DB!");
    }
  }

  return (
    <div className='App'>
      <div>
        <input
          type='number'
          onChange={(e) => setCount(Number(e.target.value))}
          value={count}
        />
      </div>
      <button onClick={() => makeGetRequest(count)}>Deliver</button>
      <p>v0.0.7</p>

      <div>
        <p>What order was delivered?</p>
        Order Number:
        <input
          type="text"
          value={orderNumber}
          onChange={ev => setOrderNumber(ev.target.value)}
        />
        
        <button onClick={deliverOrderWithWorkBox}>
          Save
        </button>
      </div>
      <div>
        <h4>Not synced Orders</h4>
        <OrderList status={'not_synced'} />
      </div>
      <div>
        <h4>Synced Orders</h4>
        <OrderList status={'synced'} />
      </div>
    </div>
  );
}

export default App;
