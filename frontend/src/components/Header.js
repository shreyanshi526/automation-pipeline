import React from "react";

export const Header = () => {
    return (
        <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 
                          border-b border-slate-700 shadow-lg relative overflow-hidden">
            
            {/* Background decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
            
            <div className="relative z-10 px-6 py-4">
                <div className="flex items-center justify-between">
                    
                    {/* Left side - Logo and title */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl 
                                           flex items-center justify-center shadow-lg">
                                <div className="w-6 h-6 bg-white/90 rounded-lg flex items-center justify-center">
                                    <div className="w-3 h-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-sm" />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 
                                              bg-clip-text text-transparent">
                                    Pipeline Builder
                                </h1>
                                <p className="text-xs text-slate-400">
                                    Visual workflow designer
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right side - User menu */}
                    <div className="flex items-center gap-2">
                        <div className="h-6 w-px bg-slate-600" />
                        
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full 
                                           flex items-center justify-center shadow-lg cursor-pointer hover:shadow-xl 
                                           transition-all duration-200">
                                <span className="text-white text-sm font-semibold">U</span>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-medium text-white">John Doe</p>
                                <p className="text-xs text-slate-400">Developer</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};