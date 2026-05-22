import React from 'react'
import { useState } from 'react'
import { Kanban, Plus } from 'lucide-react'
import { Button } from '../ui/Button'
export default function Header({ setIsModalOpen }) {
    
    return (
        <div>
            <header className="h-14 border-b border-slate-200 bg-white px-6 flex items-center justify-between shrink-0 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white shadow-sm">
                        <Kanban size={18} />
                    </div>
                    <h1 className="text-slate-800 font-semibold text-sm tracking-wide">
                        TaskAPP
                    </h1>
                </div>
                <Button
                    onClick={() => setIsModalOpen(true)}
                    variant="primary"
                    size="sm"
                >
                    <Plus size={16} />
                    Yeni Görev
                </Button>
            </header>
        </div>
    )
}
