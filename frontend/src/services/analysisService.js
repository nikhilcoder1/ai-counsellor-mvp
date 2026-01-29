// Call backend API instead of Claude directly
export const callClaudeAPI = async (data) => {
    const response = await fetch('http://localhost:3001/api/analysis', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    const result = await response.json();
    
    if (!result.success) {
        throw new Error(result.message || 'Analysis failed');
    }
    
    return result.data.analysis;
};