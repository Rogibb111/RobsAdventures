import { google } from 'googleapis'
import { OAuth2Client } from 'google-auth-library'
import { NextApiResponse } from 'next';
import { ModifiedLocation, ModifiedMessage } from '../common/types'
import { PrismaClient, Trip } from '@prisma/client'

const prisma = new PrismaClient(); 



export function getOauth2Client(res: NextApiResponse<String>): OAuth2Client {
  const { GOOGLE_CREDENTIALS } = process.env;
  if (GOOGLE_CREDENTIALS) {
    const {client_secret, client_id, redirect_uris} = JSON.parse(GOOGLE_CREDENTIALS).web;
    return new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);
  } 
  res.status(500).send('Failed. No OAuth2Client');
  throw new Error('Unable to create OAuth2Client. Check that Google Credentials have have been added to the enviornment variable GOOGLE_CREDIENTIALS');
}


export async function getLocations(trip: String): Promise<ModifiedLocation[]> {
  const locationData = await prisma.location.findMany({
    where: {
      trip: {
        name: trip.toUpperCase()
      }
    }
  });
  await prisma.$disconnect();

  return locationData.map((
    {id, gmailId, tripId, longitude, latitude, createdAt, updatedAt}
  ) => {
    return {
      id,
      gmailId,
      tripId,
      longitude,
      latitude,
      createdAt: createdAt.toString(),
      updatedAt: updatedAt.toString()
    }
  });
}

export async function getMessages(trip: string): Promise<ModifiedMessage[]> {
  const messageData = await prisma.messages.findMany({
    where: {
      trip: {
        name: trip.toUpperCase()
      }
    }
  });

  await prisma.$disconnect();

  return messageData.map((
    {id, gmailId, tripId, message, createdAt, updatedAt}
  ) => {
    return {
      id,
      gmailId,
      tripId,
      message,
      createdAt: createdAt.toString(),
      updatedAt: updatedAt.toString()
    }
  })
}

export async function getTrips(): Promise<Trip[]> {
  const trips = await prisma.trip.findMany();
  await prisma.$disconnect();

  return trips;
}
