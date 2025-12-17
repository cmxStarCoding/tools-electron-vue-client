import Dexie from 'dexie';

export const chatDB = new Dexie('chatDatabase');

// 定义数据库结构
chatDB.version(1).stores({
  messages: '++id, conversation_id, content, time',
  conversations: '++id, title, last_msg_time',
});

// CRUD 封装
export const DB = {
  table(tableName) {
    const table = chatDB.table(tableName);

    return {
      /** ---------------- 查询链式 ---------------- **/
      where(field, op, value) {
        let collection = table.where(field);
        if (op === '=') collection = collection.equals(value);
        else if (op === '>') collection = collection.above(value);
        else if (op === '>=') collection = collection.aboveOrEqual(value);
        else if (op === '<') collection = collection.below(value);
        else if (op === '<=') collection = collection.belowOrEqual(value);

        return {
          orderBy(orderField) {
            collection = collection.sortBy ? collection : collection; // Dexie sortBy 只能对数组
            this._orderField = orderField;
            return this;
          },
          limit(n) {
            this._limit = n;
            return this;
          },
          async toArray() {
            let arr = await collection.toArray();
            if (this._orderField) {
              arr.sort((a, b) => a[this._orderField] - b[this._orderField]);
            }
            if (this._limit) {
              arr = arr.slice(0, this._limit);
            }
            return arr;
          },
          async first() {
            const arr = await this.toArray();
            return arr[0] || null;
          }
        };
      },

      /** ---------------- CRUD ---------------- **/
      async add(data) {
        if (Array.isArray(data)) {
          const ids = await table.bulkAdd(data);
          return ids;
        } else {
          const id = await table.add(data);
          return id;
        }
      },

      async update(id, data) {
        const count = await table.update(id, data);
        return count;
      },

      async delete(id) {
        await table.delete(id);
        return true;
      },

      async get(id) {
        return table.get(id);
      },

      async toArray() {
        return table.toArray();
      },

      async clear() {
        await table.clear();
        return true;
      }
    };
  }
};
