import React, { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import axios from 'axios';
import { db } from './db';
import './App.css';

type OrderListProp = {
  status: string;
}

export function OrderList({status}: OrderListProp) {
  const friends = useLiveQuery(
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
    {friends?.map(order => <li key={order.id}>
      {order.orderNumber}, {order.status}
    </li>)}
  </ul>;
}

function App() {
  const [count, setCount] = useState<number>(50000000);
  const [orderNumber, setOrderNumber] = useState(Math.random().toString().split('.')[1]);
  const [status, setStatus] = useState('pending');
  const [message, setMessage] = useState('');

  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    navigator.serviceWorker.ready.then(function (sw) {
      const tags = sw.sync.getTags();
      tags.then(function (v) {
        console.table(v);
      })
    });
  }

  const deliverOrder = async () => {
    try {

      // Add the new friend!
      const id = await db.orders.add({
        orderNumber,
        status,
        message
      });

      setMessage(`Order for ${orderNumber} successfully added. Got id: ${id}`);
      setOrderNumber(Math.random().toString().split('.')[1]);
      if ('serviceWorker' in navigator && 'SyncManager' in window) {
        navigator.serviceWorker.ready
          .then(function (sw) {
            return sw.sync.register(`tag${orderNumber}`);
          })
          .then(function() {
            console.log(`tag${orderNumber} has been registered`);
          })
          .catch(function(e) {
            console.error(e);
          })
      }
    } catch (error) {
      setMessage(`Failed to add order for ${orderNumber}: ${error}`);
    }
  }

  const makeRequest = async () => {
    try {
      await axios.get(`/api?count=${count}`, {
        timeout: 500,
        headers: {
          Accept: '*/*',
        },
      });
    } catch (error) {
      console.log(error);
      alert("Orders will be synced in the background!");
    }
  };
  return (
    <div className='App'>
      <div>
        <input
          type='number'
          onChange={(e) => setCount(Number(e.target.value))}
          value={count}
        />
      </div>
      <button onClick={makeRequest}>Deliver</button>
      <p>v0.0.2</p>

      <div>
        <p>What order was delivered?</p>
        Order Number:
        <input
          type="text"
          value={orderNumber}
          onChange={ev => setOrderNumber(ev.target.value)}
        />
        
        <button onClick={deliverOrder}>
          Save
        </button>
      </div>
      <OrderList status={'pending'} />
    </div>
  );
}

export default App;
