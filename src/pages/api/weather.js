export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      allowedMethods: ['GET'] 
    });
  }

  const { city } = req.query;
  
  if (!city || typeof city !== 'string') {
    return res.status(400).json({ 
      error: 'Valid city parameter is required',
      example: '?city=London' 
    });
  }

  const apiKey = "b3bc3114ab9f4e198da183423251103";
  if (!apiKey) {
    return res.status(500).json({ 
      error: 'Server configuration error' 
    });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=no`,
      { signal: controller.signal }
    );
    
    clearTimeout(timeout);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Weather API error');
    }

    const data = await response.json();

    if (!data?.location?.name || !data?.current?.temp_c) {
      throw new Error('Invalid API response structure');
    }

    return res.status(200).json({
      success: true,
      data: {
        location: {
          name: data.location.name,
          country: data.location.country
        },
        current: {
          temp_c: data.current.temp_c,
          condition: data.current.condition.text,
          icon: data.current.condition.icon,
          humidity: data.current.humidity,
          wind_kph: data.current.wind_kph
        }
      }
    });

  } catch (error) {
    if (error.name === 'AbortError') {
      return res.status(504).json({ 
        error: 'Weather API request timed out' 
      });
    }
    
    return res.status(500).json({ 
      error: error.message || 'Failed to process weather request',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}