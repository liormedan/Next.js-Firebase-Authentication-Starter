import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  QueryConstraint,
  onSnapshot,
  Query,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

/**
 * Custom hook for fetching Firestore collections
 */
export function useCollection<T>(
  collectionPath: string,
  constraints?: QueryConstraint[],
  realtime = false
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!db) {
      setError("Firestore is not initialized");
      setLoading(false);
      return;
    }

    let q: Query;
    const colRef = collection(db, collectionPath);

    if (constraints && constraints.length > 0) {
      q = query(colRef, ...constraints);
    } else {
      q = query(colRef);
    }

    if (realtime) {
      // Real-time listener
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const items: T[] = [];
          snapshot.forEach((doc) => {
            items.push({ id: doc.id, ...doc.data() } as T);
          });
          setData(items);
          setLoading(false);
          setError(null);
        },
        (err) => {
          setError(err.message);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } else {
      // One-time fetch
      getDocs(q)
        .then((snapshot) => {
          const items: T[] = [];
          snapshot.forEach((doc) => {
            items.push({ id: doc.id, ...doc.data() } as T);
          });
          setData(items);
          setLoading(false);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [collectionPath, realtime, JSON.stringify(constraints)]);

  return { data, loading, error };
}

/**
 * Helper functions for common query constraints
 */
export const firestoreQueries = {
  where: (field: string, operator: string, value: any) =>
    where(field, operator as any, value),
  orderBy: (field: string, direction: "asc" | "desc" = "asc") =>
    orderBy(field, direction),
  limit: (count: number) => limit(count),
};

