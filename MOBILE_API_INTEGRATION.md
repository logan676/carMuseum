# AutoVerse Mobile API Integration

Your React Native mobile app has been successfully integrated with the AWS Lambda API!

## What Was Done

### 1. Created API Service Layer (`apps/mobile/src/services/api.ts`)

A centralized API service that connects to your deployed AWS endpoint:

```typescript
const API_BASE_URL = 'https://7pno67yyze.execute-api.us-east-1.amazonaws.com';

export const apiService = {
  getNews(category?: string),      // Fetch news articles
  getModels(),                     // Fetch car models
  getBrands(),                     // Fetch car brands
  getGarage(),                     // Fetch garage vehicles
  getDealerships(),                // Fetch dealerships
  getProjects(),                   // Fetch restoration projects
  getSummary(),                    // Fetch all data
  getHealth(),                     // Health check
};
```

### 2. Created React Hooks (`apps/mobile/src/hooks/useApiData.ts`)

Custom hooks for easy data fetching with loading and error states:

```typescript
useNews(category)      // Hook for news articles
useModels()            // Hook for car models
useBrands()            // Hook for brands
useGarage()            // Hook for garage vehicles
useDealerships()       // Hook for dealerships
useProjects()          // Hook for restoration projects
useSummary()           // Hook for all data
```

Each hook returns:
- `data`: The fetched data
- `loading`: Boolean loading state
- `error`: Error object if request failed
- `refetch()`: Function to manually refetch data

### 3. Updated All Screens

**DashboardScreen** - Fetches news and models from API
- Shows loading spinner while data loads
- Displays error message if API fails
- Renders dashboard with live data

**NewsScreen** - Fetches news articles with category filtering
- Real-time category filtering
- Loading states per category change
- Error handling

**EncyclopediaScreen** - Fetches models, brands, and projects
- Loads all encyclopedia data from API
- Search functionality works with live data
- Combined loading state for multiple API calls

**MyGarageScreen** - Fetches garage vehicles
- Displays user's saved vehicles from API
- Loading state while fetching

**MapScreen** - Fetches dealership locations
- Real dealership data for map markers
- Loading screen before map renders

## Files Created/Modified

### New Files:
- `apps/mobile/src/services/api.ts` - API service layer
- `apps/mobile/src/hooks/useApiData.ts` - Custom React hooks

### Modified Files:
- `apps/mobile/src/screens/DashboardScreen.tsx` - Now uses `useNews()` and `useModels()`
- `apps/mobile/src/screens/NewsScreen.tsx` - Now uses `useNews(category)`
- `apps/mobile/src/screens/EncyclopediaScreen.tsx` - Now uses `useModels()`, `useBrands()`, `useProjects()`
- `apps/mobile/src/screens/MyGarageScreen.tsx` - Now uses `useGarage()`
- `apps/mobile/src/screens/MapScreen.tsx` - Now uses `useDealerships()`

## Running the Mobile App

### 1. Install Dependencies

```bash
cd apps/mobile
npm install
```

### 2. Start the Development Server

```bash
# Start Expo
npm run start

# Or use workspace command from root
cd ../../
npm run dev:mobile
```

### 3. Run on Device/Simulator

**iOS:**
- Press `i` in the terminal to open iOS simulator
- Or scan the QR code with your iPhone's camera app

**Android:**
- Press `a` in the terminal to open Android emulator
- Or scan the QR code with Expo Go app

## Features

### Loading States
All screens show a loading spinner while fetching data from the API:
```
┌─────────────────┐
│  ⟳ Loading...  │
└─────────────────┘
```

### Error Handling
If the API request fails, users see a friendly error message:
```
┌─────────────────────────────┐
│   ⚠️                         │
│  Failed to load data.       │
│  Please check connection.   │
└─────────────────────────────┘
```

### Real-time Data
- News articles update from live API
- Category filtering works with API data
- All content is fresh from AWS Lambda

## API Endpoints Being Used

| Screen | Endpoint | Hook |
|--------|----------|------|
| Dashboard | `/api/news`, `/api/models` | `useNews()`, `useModels()` |
| News | `/api/news?category=...` | `useNews(category)` |
| Encyclopedia | `/api/models`, `/api/brands`, `/api/projects` | `useModels()`, `useBrands()`, `useProjects()` |
| My Garage | `/api/garage` | `useGarage()` |
| Map | `/api/dealerships` | `useDealerships()` |

## Testing the Integration

### 1. Test Health Endpoint

```bash
# From your terminal
curl https://7pno67yyze.execute-api.us-east-1.amazonaws.com/health
# Should return: {"status":"ok"}
```

### 2. Test in Mobile App

1. Start the app: `npm run dev:mobile`
2. Navigate to each screen
3. Verify data loads correctly
4. Test category filtering in News screen
5. Test search in Encyclopedia screen

### 3. Test Offline Behavior

1. Turn off WiFi on your device/simulator
2. Open the app
3. You should see error messages
4. Turn WiFi back on
5. Pull to refresh (if implemented) or restart app

## Code Examples

### Using API Hooks in a Component

```typescript
import { useNews } from '@/hooks/useApiData';

function MyComponent() {
  const { data, loading, error, refetch } = useNews();

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View>
      {data?.data.map(article => (
        <NewsCard key={article.id} article={article} />
      ))}
    </View>
  );
}
```

### Direct API Service Usage

```typescript
import { apiService } from '@/services/api';

// Fetch news directly
async function fetchNews() {
  try {
    const result = await apiService.getNews('Industry');
    console.log(result.data); // Array of articles
  } catch (error) {
    console.error('Failed to fetch:', error);
  }
}
```

## Troubleshooting

### Issue: "Network request failed"

**Solution:**
- Check if API is running: `curl https://7pno67yyze.execute-api.us-east-1.amazonaws.com/health`
- Verify internet connection on device/simulator
- Check if AWS Lambda function is active in AWS Console

### Issue: Data not updating

**Solution:**
- Pull to refresh if implemented
- Restart the app
- Check Lambda logs: `aws logs tail /aws/lambda/autoverse-api --follow`

### Issue: CORS errors

**Solution:**
The API already has CORS enabled via the `cors` middleware in Express. If you see CORS errors:
- Verify the API endpoint URL is correct
- Check browser console for specific CORS error
- Ensure `cors` package is installed in server

### Issue: Slow loading

**Solution:**
- Lambda cold starts can take 1-2 seconds on first request
- Subsequent requests should be fast
- Consider implementing loading skeletons for better UX

## Future Enhancements

### 1. Pull-to-Refresh

Add refresh functionality to screens:

```typescript
import { RefreshControl } from 'react-native';

function DashboardScreen() {
  const { data, loading, refetch } = useNews();

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={refetch} />
      }
    >
      {/* content */}
    </ScrollView>
  );
}
```

### 2. Caching

Implement data caching for offline support:

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Cache API responses
await AsyncStorage.setItem('news', JSON.stringify(data));

// Retrieve cached data
const cached = await AsyncStorage.getItem('news');
```

### 3. Real-time Updates

Add WebSocket support for real-time data:

```typescript
// Future: WebSocket connection to AWS API Gateway WebSocket API
const ws = new WebSocket('wss://your-websocket-endpoint');
```

### 4. Optimistic Updates

Update UI immediately before API confirms:

```typescript
// Add vehicle optimistically
setVehicles([...vehicles, newVehicle]);
try {
  await apiService.addVehicle(newVehicle);
} catch (error) {
  // Revert on error
  setVehicles(vehicles);
}
```

## Performance Tips

1. **Minimize Re-renders**: Use `useMemo` and `useCallback` for expensive operations
2. **Lazy Loading**: Load data only when needed
3. **Pagination**: Implement pagination for large lists
4. **Image Optimization**: Use optimized image formats and sizes
5. **Bundle Size**: Remove unused dependencies

## API URL Configuration

To change the API endpoint (e.g., for development vs production):

**apps/mobile/src/services/api.ts:**
```typescript
const API_BASE_URL = __DEV__
  ? 'http://localhost:4000'  // Local development
  : 'https://7pno67yyze.execute-api.us-east-1.amazonaws.com';  // Production
```

## Related Documentation

- [AWS Deployment Guide](./DEPLOYMENT_SUCCESS.md) - Details about the deployed API
- [Main README](./README.md) - Project overview
- [Server API Documentation](./README.md#api-reference-appsserver) - API endpoint details

## Support

For issues with:
- **Mobile app**: Check React Native/Expo logs
- **API**: Check Lambda logs with `aws logs tail /aws/lambda/autoverse-api --follow`
- **Network**: Use Chrome DevTools or React Native Debugger

---

**Integration completed**: October 16, 2025
**API Endpoint**: https://7pno67yyze.execute-api.us-east-1.amazonaws.com
**Mobile App**: React Native + Expo
**Backend**: AWS Lambda + API Gateway
