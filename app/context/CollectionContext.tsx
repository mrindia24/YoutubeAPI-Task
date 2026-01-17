"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../lib/firebase";
import { Collection } from "../types/collection";
import { Video } from "../types/video";


interface CollectionContextType {
  collections: Collection[];
  loading: boolean;

  // Create
  createCollection: (name: string) => Promise<void>;

  // Videos
  addVideoToCollection: (
    collectionId: string,
    video: Video
  ) => Promise<void>;

  removeVideoFromCollection: (
    collectionId: string,
    videoId: string
  ) => Promise<void>;

  // Collection management
  updateCollectionName: (
    collectionId: string,
    name: string
  ) => Promise<void>;

  clearCollectionVideos: (collectionId: string) => Promise<void>;

  deleteCollection: (collectionId: string) => Promise<void>;
}


const CollectionContext = createContext<CollectionContextType | null>(null);

export function CollectionProvider({ children }: { children: React.ReactNode }) {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);


  const createCollection = async (name: string) => {
    await addDoc(collection(db, "collections"), {
      name,
      videos: [],
    });
    fetchCollections();
  };

  const addVideoToCollection = async (
    collectionId: string,
    video: Video
  ) => {
    await updateDoc(doc(db, "collections", collectionId), {
      videos: arrayUnion(video),
    });
    fetchCollections();
  };

const removeVideoFromCollection = async (
  collectionId: string,
  videoId: string
) => {
  const colRef = doc(db, "collections", collectionId);
  const snapshot = await getDoc(colRef);

  if (!snapshot.exists()) return;

  const data = snapshot.data();
  const updatedVideos = data.videos.filter(
    (v: any) => v.videoId !== videoId
  );

  await updateDoc(colRef, {
    videos: updatedVideos,
  });

  fetchCollections();
};
const updateCollectionName = async (
  collectionId: string,
  name: string
) => {
  const ref = doc(db, "collections", collectionId);
  await updateDoc(ref, { name });
  fetchCollections();
};
const clearCollectionVideos = async (collectionId: string) => {
  const ref = doc(db, "collections", collectionId);
  await updateDoc(ref, { videos: [] });
  fetchCollections();
};
const deleteCollection = async (collectionId: string) => {
  await deleteDoc(doc(db, "collections", collectionId));
  fetchCollections();
};


useEffect(() => {
  const loadCollections = async () => {
    setLoading(true);

    const snapshot = await getDocs(collection(db, "collections"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Collection[];

    setCollections(data);
    setLoading(false);
  };

  loadCollections();
}, []);
const fetchCollections = async () => {
  const snapshot = await getDocs(collection(db, "collections"));
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Collection[];

  setCollections(data);
};


  return (
   <CollectionContext.Provider
  value={{
    collections,
    loading,
    createCollection,
    addVideoToCollection,
    removeVideoFromCollection,
    updateCollectionName,
    clearCollectionVideos,
    deleteCollection,
  }}
>

      {children}
    </CollectionContext.Provider>
  );
}

export const useCollections = () => {
  const context = useContext(CollectionContext);
  if (!context) {
    throw new Error("useCollections must be used inside CollectionProvider");
  }
  return context;
};
