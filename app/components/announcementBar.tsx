import React from 'react'

const AnnouncementBar = ({ announcements }: { announcements: string[] }) => {
    return (
        <div className="w-full bg-primary font-bold text-white overflow-hidden whitespace-nowrap p-2">
            <div className="inline-block animate-marquee">
                {
                    announcements.map((announcement:string, index:number) =>
                        <span key={index} className="mx-4 font-bold">{announcement}</span>
                    )
                }

            </div>
        </div>
    )
}

export default AnnouncementBar