import { useAuth } from '@/auth/auth_context';
import { db } from '@/firebase/firebase';
import {
  DocumentData,
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { OpportunitySchema } from '@/component/CreateOpportunity';
import { array } from 'zod';
import { RequestCreditSchemaType } from '@/app/app/opportunities/page';

//load database refrences
const opportunityRef = collection(db, 'volunteer_opportunities');

export function useOpportunityService() {
  const auth = useAuth();

  async function getOpportunity(oppId: string) {
    const docRef = doc(db, 'volunteer_opportunities', oppId);
    return await getDoc(docRef).then(doc => {
      console.log(doc);
      return doc;
    });
  }

  async function getOpportunitiesVolunteered() {
    return auth.user?.volunteeredOpportunities;
  }

  async function createOpportunity(data: OpportunitySchema) {
    let oppId;
    const oppDoc = await addDoc(opportunityRef, {
      ...data,
      userId: auth.providerUser?.uid,
      eventVolunteers: [],
    })
      .then(doc => {
        console.log(doc);
        oppId = doc.id;
      })
      .catch(err => {
        console.log(err);
      });

    // add oppId to user
    const userRef = doc(db, 'users', auth.providerUser?.uid as string);
    await updateDoc(userRef, {
      userOpportunities: arrayUnion({
        opportunityId: oppId,
      }),
    });
  }

  async function userRequestCredit(
    data: RequestCreditSchemaType,
    opportunityId: String | undefined
  ) {
    const docRef = doc(db, 'volunteer_opportunities', opportunityId as string);
    await updateDoc(docRef, {
      eventVolunteers: arrayUnion({
        ...data,
        volunteerUserId: auth.providerUser?.uid,
        validated: false,
      }),
    });
    //add to user
    const userRef = doc(db, 'users', auth.providerUser?.uid as string);
    await updateDoc(userRef, {
      volunteeredOpportunities: arrayUnion({
        opportunityId: opportunityId,
        verified: false,
        ...data,
      }),
    });
  }

  async function fetchOpportunities() {
    const opportunities = await getDocs(opportunityRef);
    return opportunities.docs;
  }

  async function fetchUserOpportunities() {
    const userOpportunities = await getDocs(
      query(opportunityRef, where('userId', '==', auth.providerUser?.uid))
    );
    console.log(userOpportunities);
    return userOpportunities.docs;
  }

  async function getRequestUser(userId: string) {
    const docRef = doc(db, 'users', userId);
    const user = await getDoc(docRef);
    return user;
  }

  async function acceptCredit(userId: string, opportunityId: string) {
    let user = (await getRequestUser(userId)).data();
    const vOppCopy = user?.volunteeredOpportunities;
    user?.volunteeredOpportunities.map((i: any, e: any) => {
      if (i.opportunityId == opportunityId) {
        vOppCopy[e] = {
          dateOfService: vOppCopy[e].dateOfService,
          hoursVolunteered: vOppCopy[e].hoursVolunteered,
          verified: true,
          volunteerReflection: vOppCopy[e].volunteerReflection,
          opportunityId: vOppCopy[e].opportunityId,
        };
      }
    });
    const docRef = doc(db, 'users', userId);
    await updateDoc(docRef, {
      volunteeredOpportunities: vOppCopy,
    });

    const oppDoc = (
      await getDoc(doc(db, 'volunteer_opportunities', opportunityId))
    ).data();

    const eVolCopy = oppDoc?.eventVolunteers;
    console.log(oppDoc)
    oppDoc?.eventVolunteers.map((i: any, e: any) => {
      if (i.volunteerUserId == userId) {
        eVolCopy[e] = {
          dateOfService: eVolCopy[e].dateOfService,
          hoursVolunteered: eVolCopy[e].hoursVolunteered,
          validated: true,
          volunteerReflection: eVolCopy[e].volunteerReflection,
          volunteerUserId: eVolCopy[e].volunteerUserId,
        };
      }
    });

    await updateDoc(doc(db, 'volunteer_opportunities', opportunityId), {
      // eventName: "Volunteer-1",
      eventVolunteers: eVolCopy,
    });
  }

  return {
    createOpportunity,
    fetchOpportunities,
    fetchUserOpportunities,
    userRequestCredit,
    getOpportunitiesVolunteered,
    getOpportunity,
    getRequestUser,
    acceptCredit,
  };
}
